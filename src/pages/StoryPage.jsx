import { useRef, useCallback, useEffect, useState } from 'react'
import slides from '../data/slides'
import './StoryPage.css'

function YearSlide({ year }) {
  return (
    <div className="slide slide-year">
      <span className="slide-dot" />
      <h1 className="year-text">{year}</h1>
    </div>
  )
}

function PhotoSlide({ img, caption }) {
  return (
    <div className="slide slide-photo">
      
      <div className="photo-content">
        <img src={img} alt={caption} loading="eager" draggable={false} />
        <p className="photo-caption">{caption}</p>
      </div>
    </div>
  )
}

function ValentineSlide({ img, caption }) {
  return (
    <div className="slide slide-valentine">

      <div className="photo-content">
        <img src={img} alt={caption} loading="eager" draggable={false} />
        <p className="photo-caption">{caption}</p>
      </div>
    </div>
  )
}

function CameraSlide({ caption }) {
  const streamRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const videoCallbackRef = useCallback((node) => {
    if (node && streamRef.current) {
      node.srcObject = streamRef.current
    }
  }, [])

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      setActive(true)
    } catch {
      /* camera denied or unavailable */
    }
  }, [])

  return (
    <div className="slide slide-camera">
      <div className="photo-content">
        <div className="photo-wrapper camera-wrapper">
          {active ? (
            <video ref={videoCallbackRef} autoPlay playsInline muted />
          ) : (
            <button className="camera-start" onClick={startCamera}>
              Tap to capture the moment!
            </button>
          )}
        </div>
        <p className="photo-caption">{caption}</p>
      </div>
    </div>
  )
}

function snapToSlide(el, startScrollLeft) {
  const slideWidth = el.offsetWidth
  const delta = el.scrollLeft - startScrollLeft
  const threshold = slideWidth * 0.05
  const currentIndex = Math.round(startScrollLeft / slideWidth)
  let targetIndex
  if (delta < -threshold) {
    targetIndex = Math.max(0, currentIndex - 1)
  } else if (delta > threshold) {
    targetIndex = currentIndex + 1
  } else {
    targetIndex = currentIndex
  }
  el.style.scrollBehavior = 'smooth'
  el.scrollTo({ left: targetIndex * slideWidth, behavior: 'smooth' })
  const onEnd = () => {
    el.style.scrollSnapType = 'x mandatory'
    el.removeEventListener('scrollend', onEnd)
  }
  el.addEventListener('scrollend', onEnd)
}

export default function StoryPage() {
  const containerRef = useRef(null)
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = useCallback((e) => {
    const el = containerRef.current
    el.style.scrollSnapType = 'none'
    el.style.scrollBehavior = 'auto'
    dragState.current = {
      isDragging: true,
      startX: e.pageX,
      scrollLeft: el.scrollLeft,
    }
    el.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!dragState.current.isDragging) return
    const dx = e.pageX - dragState.current.startX
    containerRef.current.scrollLeft = dragState.current.scrollLeft - dx
  }, [])

  const onMouseUp = useCallback(() => {
    if (!dragState.current.isDragging) return
    dragState.current.isDragging = false
    const el = containerRef.current
    el.style.cursor = ''
    snapToSlide(el, dragState.current.scrollLeft)
  }, [])

  return (
    <div
      className="timeline-container"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="slides-wrapper">
        <div
          className="timeline-line"
          style={{ width: `calc(${slides.length - 1} * 100vw - var(--line-inset))` }}
        />
        <div
          className="timeline-arrow"
          style={{ left: `calc(${slides.length - 1} * 100vw - var(--line-inset) + 50vw)` }}
        />
        {slides.map((slide, i) => {
          if (slide.type === 'year') {
            return <YearSlide key={i} year={slide.year} />
          }
          if (slide.type === 'valentine') {
            return <ValentineSlide key={i} img={slide.img} caption={slide.caption} />
          }
          if (slide.type === 'camera') {
            return <CameraSlide key={i} caption={slide.caption} />
          }
          return <PhotoSlide key={i} img={slide.img} caption={slide.caption} />
        })}
      </div>
    </div>
  )
}
