# PaperPod 🎙️

Convert academic papers into engaging podcast-style audio content using AI.

## Features

- 📄 Upload PDF research papers
- 🤖 AI-powered conversion to conversational format
- 🎧 Text-to-speech generation
- 💾 Audio file storage and streaming
- 🎨 Modern, responsive UI

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- OpenAI API (GPT-4 & TTS)
- Supabase (Storage)

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key
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

## Limitations

- Maximum PDF file size: 10MB
- Processes first ~12,000 characters of the paper
- Generated audio limited to ~4,000 characters

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 