import { useState, useEffect, useRef } from 'react'

export default function Tile({ project, index }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`tile reveal ${project.layout} ${open ? 'active' : ''} ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="tile-inner">
        <video
          src={project.mediaUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <button className="toggle" onClick={() => setOpen(!open)}>
        +
      </button>

      <div className="overlay">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  )
}

