import { FileUpload } from '@/components/FileUpload'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Transform Research Papers into Engaging Audio Content
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Upload your PDF research paper and let AI convert it into a podcast-style audio experience
          </p>
          <FileUpload />
        </div>
      </div>
    </main>
  )
} 