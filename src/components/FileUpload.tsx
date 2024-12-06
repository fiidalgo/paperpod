'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import AudioPlayer from './AudioPlayer'

export function FileUpload() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 10MB limit')
      return
    }

    console.log('Starting file upload process')
    setIsProcessing(true)
    setError(null)

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      console.log('File converted to base64, sending to API...')
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64 }),
      })

      console.log('Response received:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process PDF')
      }

      setAudioUrl(data.audioUrl)
    } catch (err) {
      console.error('Error in file upload:', err)
      setError('Failed to process the PDF. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  })

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 transition-colors cursor-pointer
          ${isDragActive ? 'border-purple-500 bg-purple-50/5' : 'border-gray-700 hover:border-purple-500'}
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <FaCloudUploadAlt className="text-4xl text-purple-500" />
          <p className="text-gray-300">
            {isDragActive
              ? 'Drop your PDF here'
              : 'Drag and drop your PDF here, or click to select'}
          </p>
        </div>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center space-x-2 text-purple-500">
          <FaSpinner className="animate-spin" />
          <span>Converting your paper to audio...</span>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {audioUrl && (
        <AudioPlayer audioUrl={audioUrl} />
      )}
    </div>
  )
} 