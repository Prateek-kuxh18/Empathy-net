import React, { useState } from 'react'
import { detectEmotionFromText, EMOTIONS, fakeTranslate, playTone } from '../utils_emotions.js'
import HologramPreview from './HologramPreview.jsx'

export default function EmotionPost({ onCreate }){
  const [text, setText] = useState('')
  const [lang, setLang] = useState('en')
  const [preview, setPreview] = useState(null)

  const handlePreview = () => {
    if (!text.trim()) return
    const emotion = detectEmotionFromText(text)
    const cfg = EMOTIONS[emotion]
    setPreview({ emotion, ...cfg })
    playTone(cfg.tone)
  }

  const handlePost = () => {
    if (!text.trim()) return
    const emotion = detectEmotionFromText(text)
    const cfg = EMOTIONS[emotion]
    const translations = fakeTranslate(text)
    const post = {
      id: crypto.randomUUID(),
      text,
      emotion,
      translations,
      color: cfg.color,
      shape: cfg.shape,
      resonance: 0,
      createdAt: Date.now()
    }
    onCreate(post)
    playTone(cfg.tone, 500)
    setText('')
    setPreview(null)
  }

  return (
    <div className="card">
      <h2>Thought → Emotion</h2>
      <p className="muted">Type a short thought and press Preview or Post</p>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder='e.g., "I feel hopeful about tomorrow"' />
      <div className="controls">
        <select value={lang} onChange={e=>setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
        </select>
        <button className="btn" onClick={handlePreview}>Preview</button>
        <button className="btn primary" onClick={handlePost}>Post</button>
      </div>

      {preview && (
        <div className="preview-grid">
          <div><HologramPreview color={preview.color} shape={preview.shape} /></div>
          <div>
            <p className="muted">Detected Emotion</p>
            <h3 style={{color: preview.color}}>{preview.label || preview.emotion}</h3>
            <p className="muted">Translations (demo)</p>
            <ul>
              {Object.entries(fakeTranslate(text)).map(([k,v])=>(
                <li key={k}><b>{k.toUpperCase()}:</b> {v}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
