import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const NO_TEXTS = [
  'No',
  'Are you sure?',
  'Really sure?',
  'Really Really?',
  'Really Really Really?',
  'Think again!',
  '😢',
  "Last chance!",
  '💔',
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [noCount, setNoCount] = useState(0)
  const [noPosition, setNoPosition] = useState({})

  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1)
    const vw = window.innerWidth
    const vh = window.innerHeight
    const btnW = 160
    const btnH = 50
    const pad = 20
    const x = Math.random() * (vw - btnW - pad * 2) + pad
    const y = Math.random() * (vh - btnH - pad * 2) + pad
    setNoPosition({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      right: 'auto',
      transform: 'none',
    })
  }, [])

  const handleYes = useCallback(() => {
    navigate('/story')
  }, [navigate])

  const noText = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)]
  const yesScale = 1 + noCount * 0.15

  return (
    <div className="landing-container">
      <h1 className="landing-title">밍화, Would you be my Valentine? 💌</h1>
      <div className="buttons-container">
        <button
          className="btn-yes"
          style={{ transform: `scale(${yesScale})` }}
          onClick={handleYes}
        >
          Yes! 💖
        </button>
        <button
          className="btn-no"
          style={noPosition}
          onClick={handleNo}
        >
          {noText}
        </button>
      </div>
    </div>
  )
}
