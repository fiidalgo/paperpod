'use client'

import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa'

interface AudioPlayerProps {
  audioUrl: string
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime += seconds
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => skipTime(-10)}
            className="text-gray-300 hover:text-purple-500 transition-colors"
          >
            <FaBackward />
          </button>
          
          <button
            onClick={togglePlay}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 transition-colors"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          <button
            onClick={() => skipTime(10)}
            className="text-gray-300 hover:text-purple-500 transition-colors"
          >
            <FaForward />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-gray-400 text-sm">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
} 