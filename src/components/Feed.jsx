import React from 'react'
import HologramPreview from './HologramPreview.jsx'

export default function Feed({ posts, onResonate }){
  if (!posts.length) return <div className="card"><p className="muted">No posts yet — be the first to share a feeling.</p></div>
  return (
    <div className="feed">
      {posts.map(p => (
        <div className="post" key={p.id}>
          <div className="post-left">
            <HologramPreview color={p.color} shape={p.shape} />
          </div>
          <div className="post-right">
            <div className="meta">
              <span className="em-label" style={{background:p.color}}>{p.emotion.toUpperCase()}</span>
              <span className="time">{new Date(p.createdAt).toLocaleTimeString()}</span>
            </div>
            <p className="text">{p.text}</p>
            <div className="translations">
              <small className="muted">EN</small><span>{p.translations.en}</span>
              <small className="muted">HI</small><span>{p.translations.hi}</span>
              <small className="muted">JA</small><span>{p.translations.ja}</span>
            </div>
            <div className="res-row">
              <button className="resonate" onClick={()=>onResonate(p.id)}>Resonate 💜</button>
              <div className="res-count">{p.resonance}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
