import { useRef, useEffect, useCallback, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StoryPage from './pages/StoryPage'
import './App.css'

function BackgroundMusic() {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  const startMusic = useCallback(() => {
    if (started) return
    audioRef.current?.play().catch(() => {})
    setStarted(true)
  }, [started])

  useEffect(() => {
    document.addEventListener('click', startMusic, { once: true })
    return () => document.removeEventListener('click', startMusic)
  }, [startMusic])

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setMuted(!muted)
    }
  }, [muted])

  return (
    <>
      <audio ref={audioRef} src="/music/bg-music.mp3" loop />
      <button className="music-toggle" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename="/valentine-project-2026/">
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
