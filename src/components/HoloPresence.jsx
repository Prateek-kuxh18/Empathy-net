import React from 'react'

function Orb({ color='#7DF9FF', i=0, total=5, resonance=0 }){
  const size = 60 + Math.min(resonance, 30)
  const angle = (i/total) * Math.PI * 2
  const style = {
    background: color,
    width: size+'px',
    height: size+'px',
    transform: `translate(${Math.cos(angle)*120}px, ${Math.sin(angle)*60}px)`
  }
  return <div className="orb" style={style} />
}

export default function HoloPresence({ posts = [] }){
  const colors = posts.map(p=>p.color)
  const resonances = posts.map(p=>p.resonance || 0)
  const total = Math.max(colors.length, 5)
  return (
    <div className="card holo-room">
      <h3>HoloPresence — Group Room</h3>
      <p className="muted">Emotional orbs float and cluster. Higher resonance → bigger orbs.</p>
      <div className="room">
        {Array.from({length: total}).map((_,i)=>(
          <Orb key={i} color={colors[i]||'#7DF9FF'} i={i} total={total} resonance={resonances[i]||0} />
        ))}
      </div>
    </div>
  )
}
