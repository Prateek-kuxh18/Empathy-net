import React from 'react'

export default function HologramPreview({ color='#7DF9FF', shape='sphere' }){
  const style = { '--c': color }
  return (
    <div className="holo-wrap" style={style}>
      <div className={'holo-blob '+shape} />
      <div className="holo-glow" />
    </div>
  )
}
