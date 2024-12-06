# PaperPod 🎙️

Convert academic papers into engaging podcast-style audio content using AI. PaperPod transforms dense academic content into accessible, conversational audio formats, making research papers easier to consume on the go.

## How It Works

1. **PDF Processing**: Upload any research paper in PDF format. The application extracts and processes the text content.

2. **AI Transformation**: Using OpenAI's GPT-4, the academic text is intelligently transformed into a conversational, podcast-style narrative while maintaining technical accuracy.

3. **Audio Generation**: The conversational script is converted to natural-sounding speech using OpenAI's Text-to-Speech technology.

4. **Storage & Streaming**: The generated audio is stored in Supabase and made available for streaming through a custom audio player.

## Features

- 📄 Upload PDF research papers (up to 10MB)
- 🤖 AI-powered conversion to conversational format
- 🎧 High-quality text-to-speech generation
- 💾 Cloud storage and streaming
- 🎨 Modern, responsive UI with drag-and-drop support
- ⚡ Fast processing (typically 20-30 seconds)

## Tech Stack

### Frontend
- **Next.js 14**: React framework for production-grade applications
- **React**: UI component library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Dropzone**: Drag-and-drop file upload functionality
- **React Icons**: Icon components

### Backend (API Routes)
- **Next.js API Routes**: Serverless functions for backend operations
- **pdf-parse**: PDF text extraction
- **OpenAI API**:
  - GPT-4: Text transformation
  - TTS-1: Text-to-speech conversion

### Storage
- **Supabase Storage**: Cloud storage for audio files
- **Supabase Client**: JavaScript client for Supabase interactions

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **npm**: Package management

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key with access to:
  - GPT-4 API
  - TTS API
- Supabase account and project

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:fiidalgo/paperpod.git
   cd paperpod
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Set up Supabase:
   - Create a new Supabase project
   - Create a storage bucket named `audio-files`
   - Set the bucket's privacy settings to allow public access
   - Copy your project URL and keys to the `.env.local` file

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload a PDF research paper using the drag-and-drop interface
2. Wait for processing (typically 20-30 seconds)
3. Listen to your paper as a podcast!

## Technical Details

### Processing Pipeline
1. PDF text extraction using pdf-parse
2. Text truncation to first ~12,000 characters (optimized for GPT-4)
3. GPT-4 conversion to conversational format
4. Text-to-speech generation (limited to ~4,000 characters)
5. Audio storage and streaming setup

### Limitations

- Maximum PDF file size: 10MB
- Processes first ~12,000 characters of the paper
- Generated audio limited to ~4,000 characters
- Requires stable internet connection for API calls
- Processing time varies based on paper length and API response times

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 