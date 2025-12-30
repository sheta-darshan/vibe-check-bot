import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Zap, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'
import ParticleBackground from './components/ParticleBackground'
import Header from './components/Header'
import ResultCard from './components/ResultCard'
import HistoryTape from './components/HistoryTape'
import useInternalAudio from './hooks/useInternalAudio'

// Constants
const LOADING_MESSAGES = [
  "Scanning for audacity...",
  "Consulting the 2025 burnout archives...",
  "Calculating delusion coefficient...",
  "Checking bank balance...",
  "Asking GPT-5 if this is a joke...",
  "Measuring vibe alignment...",
  "Cross-referencing with reality...",
  "Loading harsh truths...",
  "Decrypting dream state...",
]

const ROASTS = {
  achievable: [
    "Wow, a reasonable human being. Rare.",
    "Boring, but you'll actually do it.",
    "Look at you, setting the bar at ankle height. Respect.",
    "This is so doable I almost fell asleep reading it.",
    "2026 might actually be your year?",
    "Sensible. Functioning adult energy.",
    "Mom would be proud. I'm bored, but proud.",
  ],
  optimistic: [
    "I love the energy, but let's see how long it lasts.",
    "Gym every day? Who are you, The Rock?",
    "Ambition is cute. Good luck with February.",
    "This smells like a 'New Year, New Me' Instagram post.",
    "You're gonna need more caffeine for this one.",
    "A bit stretch, but not entirely impossible. Maybe.",
    "Main Character energy, but do you have the plot armor?",
  ],
  delusional: [
    "Billionaire by Feb? Okay, settle down Elon.",
    "I admire the sheer lack of connection to reality.",
    "This resolution has higher inflation than the economy.",
    "Did you hit your head, or is this a cry for help?",
    "Start by naming variables something other than 'x' first.",
    "Fixing sleep schedule? In this economy? LMAO.",
    "Pure sci-fi. I love it.",
    "Sir, this is a Wendy's.",
    "Have you considered therapy instead?",
  ]
}

const TRENDING_PRESETS = [
  "Drink 3L water daily",
  "Quit sugar completely",
  "Learn Rust & Go",
  "Run a marathon",
  "Save $100k",
  "75 Hard Challenge",
  "Wake up at 5AM",
  "Digital Detox",
]

function App() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [isMatrix, setIsMatrix] = useState(false)

  const inputRef = useRef(null)
  const resultCardRef = useRef(null)
  const { enabled: audioEnabled, setEnabled: setAudioEnabled, playHover, playClick, playSuccess, playFail } = useInternalAudio()

  useEffect(() => {
    if (input.toLowerCase().includes('matrix')) {
      setIsMatrix(true)
    } else if (input.toLowerCase().includes('reset')) {
      setIsMatrix(false)
    }
  }, [input])

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: isMatrix ? ['#00FF00', '#003300'] : ['#FFD700', '#FF00FF', '#00FFFF'],
      disableForReducedMotion: true
    })
  }

  const analyzeResolution = () => {
    if (!input.trim()) return

    playClick()
    setLoading(true)
    let msgIndex = 0
    const msgInterval = setInterval(() => {
      setLoadingMsg(LOADING_MESSAGES[msgIndex % LOADING_MESSAGES.length])
      msgIndex++
    }, 300)

    setTimeout(() => {
      clearInterval(msgInterval)
      setLoading(false)

      // Improved Logic with Regex
      const text = input.toLowerCase()
      let score = 50
      let category = 'optimistic'

      const delusionalKeywords = ['billionaire', 'millionaire', 'trillionaire', 'never', 'always', 'quit job', 'perfect', 'ceo', 'astronaut', 'marry', 'famous', 'hollywood', 'president', 'mars', 'lottery', 'passive income', 'crypto whale', '100%', 'quit sugar', 'completely', 'forever', 'perfectly', 'no sugar']
      const optimisticKeywords = ['gym', 'every day', 'daily', 'read', 'learn', 'code', 'job', 'promotion', 'run', 'marathon', 'floss', 'save', 'invest', 'language', 'sober', 'write', 'book', '75 hard', 'meditate', 'diet']
      const achievableKeywords = ['water', 'walk', 'sleep', 'friend', 'eat', 'try', 'maybe', 'once', 'book', 'class', 'vegetable', 'call', 'mom', 'dad', 'text', 'clean', 'drink', 'study']

      // Regex matching for whole words to avoid false positives
      const countMatches = (keywords) => {
        return keywords.filter(k => {
          const regex = new RegExp(`\\b${k}\\b`, 'i');
          return regex.test(text);
        }).length;
      }

      let delCount = countMatches(delusionalKeywords)
      let optCount = countMatches(optimisticKeywords) // "diet" is here now
      let achCount = countMatches(achievableKeywords)

      // LOGIC INVERSION: High Score = Realism/Success Chance
      if (text.length < 5) {
        score = 5; category = 'delusional' // Too short = invalid/delusional
      } else if (delCount > 0) {
        // Delusional: Score 0-30%
        score = Math.max(0, 30 - (delCount * 10));
        category = 'delusional'
      } else if (optCount > 2) {
        // Too many optimistic goals -> leans delusional
        score = 40;
        category = 'optimistic';
      } else if (optCount > 0) {
        // Optimistic: Score 40-70%
        score = 50 + (optCount * 5);
        category = 'optimistic'
      } else if (achCount > 0) {
        // Achievable: Score 75-100%
        score = 80 + (achCount * 5);
        category = 'achievable'
      } else {
        // Fallback - assume slightly optimistic but unknown
        score = 50;
        category = 'optimistic';
      }

      score = Math.min(Math.max(score, 0), 100)

      const roastList = ROASTS[category]
      const roast = roastList[Math.floor(Math.random() * roastList.length)]

      const newResult = { score, category, roast, input }
      setResult(newResult)
      setHistory([newResult, ...history])

      if (category === 'achievable') {
        triggerConfetti()
        playSuccess()
      } else if (category === 'delusional') {
        playFail()
      } else {
        playSuccess()
      }

    }, 2000)
  }

  const reset = () => {
    playClick()
    setResult(null)
    setInput('')
    setLoading(false)
  }

  const downloadCard = async () => {
    playClick()
    if (!resultCardRef.current) {
      console.error("Result card ref is null")
      return
    }

    try {
      console.log("Starting capture...")
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#1a0b2e',
        scale: 3,
        useCORS: true,
        logging: true,
        onclone: (clonedDoc) => {
          // Fix for Glitch Text: Remove the class to prevent overlapping/distorted text in screenshot
          const glitchElement = clonedDoc.querySelector('.glitch-text');
          if (glitchElement) {
            glitchElement.classList.remove('glitch-text');
            glitchElement.style.textShadow = 'none'; // Ensure clean look
            glitchElement.style.color = '#ffffff';
          }

          // Ensure Input Text is highly visible
          const italicText = clonedDoc.querySelector('.italic');
          if (italicText) {
            italicText.style.color = '#fff';
            italicText.style.textShadow = '0 2px 10px rgba(0,0,0,0.5)';
          }
        }
      })

      const dataUrl = canvas.toDataURL('image/png')
      console.log("Canvas captured, data URL length:", dataUrl.length)

      if (dataUrl === 'data:,') {
        throw new Error("Empty data URL generated")
      }

      const link = document.createElement('a')
      link.download = `vibe-check-result-${Date.now()}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("Download triggered successfully")

    } catch (err) {
      console.error("Failed to generate image:", err)
      alert("Oops! Could not generate the image. Check console for details.")
    }
  }

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans selection:bg-neon-pink selection:text-white transition-colors duration-1000 ${isMatrix ? 'grayscale hue-rotate-90 contrast-125' : ''}`}>

      <ParticleBackground isMatrix={isMatrix} />

      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        aria-label={audioEnabled ? "Mute Audio" : "Enable Audio"}
        className="fixed top-4 right-4 p-2 rounded-full bg-black/40 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/20 transition-all z-50 backdrop-blur-sm"
      >
        {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-10 w-full max-w-lg bg-cyber-charcoal/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl ring-1 ring-white/5 perspective-1000 mb-8"
        >

          <Header isMatrix={isMatrix} />

          {!result && !loading && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-neon-blue text-xs font-bold mb-2 ml-1 tracking-widest">INPUT DATA STREAM</label>
                <textarea
                  ref={inputRef}
                  className="w-full bg-black/40 border border-neon-purple/30 rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-transparent transition-all min-h-[120px] resize-none text-base md:text-lg shadow-inner font-mono backdrop-blur-sm"
                  placeholder="e.g., Become a billionaire, Gym everyday, finally learn Rust..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onMouseEnter={playHover}
                />
              </div>

              {/* Trending Presets */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {TRENDING_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { playClick(); setInput(preset) }}
                    onMouseEnter={playHover}
                    className="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-neon-purple/20 hover:border-neon-purple/50 text-gray-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <button
                onClick={analyzeResolution}
                disabled={!input.trim()}
                onMouseEnter={playHover}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-xl hover:shadow-neon-pink/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 relative overflow-hidden ${isMatrix ? 'bg-green-900 border border-green-500' : 'bg-gradient-to-r from-cyber-purple via-[#4a1c6e] to-neon-pink'}`}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Zap className="w-5 h-5 group-hover:fill-current animate-pulse" />
                ANALYZE REALITY
              </button>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-neon-purple/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-neon-pink animate-spin shadow-[0_0_20px_rgba(255,0,255,0.5)]"></div>
                <div className="absolute inset-2 rounded-full border-4 border-r-neon-blue animate-spin-reverse opacity-50"></div>
              </div>
              <p className="text-sm font-mono text-neon-gold animate-pulse tracking-widest uppercase">{loadingMsg}</p>
            </motion.div>
          )}

          {result && (
            <ResultCard
              result={result}
              input={input}
              resultCardRef={resultCardRef}
              reset={reset}
              downloadCard={downloadCard}
              playHover={playHover}
            />
          )}

        </motion.div>
      </AnimatePresence>

      <HistoryTape history={history} />

      {/* Footer */}
      <div className="fixed bottom-4 text-center w-full text-[10px] text-gray-600 font-mono uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity pointer-events-none">
        © 2026 REALITY CORP • NO REFUNDS ON DREAMS
      </div>
    </div>
  )
}

export default App
