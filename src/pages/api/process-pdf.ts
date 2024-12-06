import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import * as pdfParse from 'pdf-parse'

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Constants
const MAX_PAPER_CHARS = 12000 // About 3000 tokens for GPT-4
const MAX_SCRIPT_CHARS = 4000 // Slightly under TTS limit of 4096

// API Route Configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb' // Increased to handle base64 encoded PDFs
    }
  }
}

function truncateText(text: string, maxLength: number): string {
  // Split into sentences and add until we reach the limit
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  let result = ''
  
  for (const sentence of sentences) {
    if ((result + sentence).length <= maxLength) {
      result += sentence
    } else {
      break
    }
  }
  
  return result.trim()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('API endpoint reached')

    if (!req.body || !req.body.file) {
      console.log('No file received')
      return res.status(400).json({ error: 'No file provided' })
    }

    // Convert base64 to buffer
    const base64Data = req.body.file.split(';base64,').pop()
    const fileBuffer = Buffer.from(base64Data!, 'base64')
    
    console.log('Processing PDF...')

    // Parse PDF
    const pdfData = await pdfParse(fileBuffer)
    console.log('PDF parsed successfully, text length:', pdfData.text.length)

    // Truncate the paper text to a manageable size
    const truncatedText = truncateText(pdfData.text, MAX_PAPER_CHARS)
    console.log('Truncated text length:', truncatedText.length)

    // Process with GPT-4
    console.log('Sending to GPT-4...')
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert at converting academic papers into engaging, podcast-style narratives. 
            Keep the technical accuracy but make it more conversational and easier to follow.
            IMPORTANT: Your response MUST be under ${MAX_SCRIPT_CHARS} characters.
            Focus on the key findings and main ideas only.`
        },
        {
          role: "user",
          content: `Convert this academic paper into a concise podcast script: ${truncatedText}`
        }
      ],
    })

    const podcastScript = completion.choices[0].message.content
    if (!podcastScript) {
      throw new Error('No script generated from GPT-4')
    }
    
    // Double check length
    const finalScript = truncateText(podcastScript, MAX_SCRIPT_CHARS)
    console.log('Script length:', finalScript.length)

    // Generate audio
    console.log('Generating audio with Text-to-Speech...')
    const speechResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: finalScript,
    })

    console.log('Audio generated successfully')

    // Convert to buffer and upload to Supabase
    const audioBuffer = Buffer.from(await speechResponse.arrayBuffer())
    const fileName = `${Date.now()}-audio.mp3`
    
    console.log('Uploading to Supabase...')
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('audio-files')
      .upload(fileName, audioBuffer, {
        contentType: 'audio/mpeg',
        cacheControl: '3600',
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      throw uploadError
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('audio-files')
      .getPublicUrl(fileName)

    console.log('Process complete, returning audio URL')
    return res.status(200).json({ audioUrl: publicUrl })

  } catch (error) {
    console.error('Error processing PDF:', error)
    return res.status(500).json({ 
      error: 'Failed to process PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 