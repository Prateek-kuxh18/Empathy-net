import React, { useState } from 'react'
import EmotionPost from './components/EmotionPost.jsx'
import Feed from './components/Feed.jsx'
import HoloPresence from './components/HoloPresence.jsx'
import './styles/app.css'

export default function App(){
  const [posts, setPosts] = useState([])

  const addPost = (post) => {
    setPosts(p => [post, ...p])
  }

  const resonate = (id) => {
    setPosts(p => p.map(x => x.id===id ? {...x, resonance: x.resonance+1} : x))
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">
          <div className="logo">EN</div>
          <div>
            <h1>EMPATHY<span>NET</span></h1>
            <p>2070 — Connect by resonance, not likes</p>
          </div>
        </div>
      </header>

      <main className="main-grid">
        <section className="left-panel">
          <EmotionPost onCreate={addPost} />
          <Feed posts={posts} onResonate={resonate} />
        </section>

        <aside className="right-panel">
          <HoloPresence posts={posts} />
        </aside>
      </main>

      <footer className="footer">
        Built for Hackathon — Demo only (no backend) • Press Preview to play audio
      </footer>
    </div>
  )
}
