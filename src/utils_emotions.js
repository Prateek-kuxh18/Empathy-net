export const EMOTIONS = {
  hope:    { color: '#FFD166', shape: 'sphere', tone: 520, label: 'Hope' },
  sadness: { color: '#4DA3FF', shape: 'ripple', tone: 220, label: 'Sadness' },
  anger:   { color: '#FF6B6B', shape: 'spike', tone: 180, label: 'Anger' },
  love:    { color: '#FF8ACB', shape: 'heart', tone: 440, label: 'Love' },
  excitement:{ color:'#7DF9FF', shape: 'burst', tone: 640, label: 'Excitement' },
}

export function detectEmotionFromText(text){
  const t = text.toLowerCase()
  if (/(hope|optimistic|future|tomorrow)/.test(t)) return 'hope'
  if (/(sad|lonely|down|unhappy|depressed)/.test(t)) return 'sadness'
  if (/(angry|mad|furious|annoyed)/.test(t)) return 'anger'
  if (/(love|affection|heart|care)/.test(t)) return 'love'
  if (/(excited|thrilled|hyped|wow)/.test(t)) return 'excitement'
  return 'hope'
}

// fake translator
const samples = {
  'i feel hopeful about tomorrow': { en: 'I feel hopeful about tomorrow', hi: 'मुझे कल के बारे में आशा है', ja: '私は明日に希望を感じています' },
  'the future is beautiful': { en: 'The future is beautiful', hi: 'भविष्य सुन्दर है', ja: '未来は美しい' },
  'i feel lonely today': { en: 'I feel lonely today', hi: 'आज मैं अकेला महसूस कर रहा हूँ', ja: '今日は孤独を感じます' }
}

export function fakeTranslate(text){
  const t = text.trim().toLowerCase()
  const hit = samples[t]
  if (hit) return hit
  return { en: text, hi: text, ja: text }
}

// simple audio tone
let audioCtx
export function playTone(freq=440, duration=400){
  try{
    if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)()
    const o = audioCtx.createOscillator()
    const g = audioCtx.createGain()
    o.type = 'sine'
    o.frequency.value = freq
    g.gain.value = 0.0001
    o.connect(g); g.connect(audioCtx.destination)
    const now = audioCtx.currentTime
    g.gain.exponentialRampToValueAtTime(0.2, now+0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration/1000)
    o.start(now); o.stop(now + duration/1000)
  }catch(e){}
}
