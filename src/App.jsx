import { useEffect, useState } from 'react'
import { createClient } from '@sanity/client'
import Tile from './Tile'

const client = createClient({
  projectId: 'c959c2pu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

function App() {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  useEffect(() => {
    client.fetch(`
      *[_type == "project"] | order(order asc){
        _id,
        title,
        description,
        "mediaUrl": media.asset->url,
        layout,
        column
      }
    `).then(setProjects)
  }, [])

  const leftColumn = projects.filter(p => p.column === 'left')
  const rightColumn = projects.filter(p => p.column === 'right')
  
  const isMobile = window.innerWidth <= 768

useEffect(() => {
  const elements = document.querySelectorAll('.reveal')

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  elements.forEach(el => observer.observe(el))

  return () => observer.disconnect()
}, [projects])
  
  return (
    <main>
    <div className="hero reveal">
      <h1>James Animates</h1>
    </div>

      <div className="grid">
  {isMobile ? (
    projects.map((project, i) => (
  <Tile key={project._id} project={project} index={i} />
))
  ) : (
    <>
      <div className="column">
{leftColumn.map((project, i) => (
  <Tile key={project._id} project={project} index={i * 2} />
))}
      </div>

            
            
      <div className="column">
        {rightColumn.map((project, i) => (
  <Tile key={project._id} project={project} index={i * 2 + 1} />
))}
      </div>
    </>
  )}
</div>
      
      <div className="footer-nav reveal">
        <a href="https://www.instagram.com/coviello.design/" className="footer-item" target="_blank" rel="noopener noreferrer">illustration</a>
        <a href="https://coviellodesign.com" className="footer-item" target="_blank" rel="noopener noreferrer">websites</a>
        <a href="/JamesCoviello_Resume_2026.pdf" className="footer-item" target="_blank" rel="noopener noreferrer">resume</a>
      </div>

      <div className="site-credit">
        Built from scratch. © 2026 James Coviello Design.
      </div>
    </main>
  )
}

export default App