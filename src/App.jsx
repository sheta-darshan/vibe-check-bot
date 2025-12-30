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

const REALITY_WEIGHTS = {
  // Delusional (Negative Weights)
  'billionaire': -60, 'millionaire': -40, 'trillionaire': -80, 'never': -30,
  'always': -30, 'quit job': -50, 'perfect': -40, 'ceo': -40, 'astronaut': -60,
  'marry': -40, 'famous': -50, 'hollywood': -60, 'president': -80, 'mars': -70,
  'lottery': -90, 'passive income': -40, 'crypto': -30, '100%': -20,
  'quit sugar': -40, 'no sugar': -40, 'six pack': -30, 'abs': -20,

  // Realistic/Achievable (Positive Weights)
  'water': 25, 'walk': 20, 'sleep': 25, 'friend': 15, 'eat': 10, 'vegetable': 20,
  'fruit': 20, 'try': 15, 'maybe': 10, 'once': 10, 'book': 15, 'class': 15,
  'call': 20, 'mom': 25, 'dad': 25, 'text': 15, 'clean': 20, 'drink': 10,
  'study': 15, 'save': 15, 'invest': 10, 'floss': 30,

  // Optimistic (Neutral/Slight Positive)
  'gym': 5, 'run': 5, 'code': 5, 'learn': 10, 'read': 10, 'job': 10,
  'promotion': 5, 'language': 5, 'meditate': 10, 'diet': 0
}

const INTENSITY_MULTIPLIERS = {
  'daily': 0.85, 'every': 0.85, 'day': 0.9, 'always': 0.5, 'never': 0.5,
  'completely': 0.6, 'forever': 0.4, 'strictly': 0.7, 'perfectly': 0.5,
  '100%': 0.6
}

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
  ],
  developer: [
    "Git push --force your life?",
    "You can't sudo make me believe that.",
    "404: Willpower not found.",
    "Reading the docs > Solving life problems.",
    "Refactor your expectations.",
    "Is this deployed to prod or just localhost?",
  ],
  trader: [
    "Leverage 100x on verify failure.",
    "Liquidation price hit immediately.",
    "Shorting your success rate.",
    "Buy high, sell your dreams low.",
    "This is financial advice: Don't.",
  ],
  student: [
    "GPA is temporary, burnout is forever.",
    "Fixing sleep schedule? In this economy?",
    "Academic weapon? More like academic victim.",
    "Study break is over. Get back to work.",
    "The mitochondria is the powerhouse of your stress.",
  ]
}

const TRENDING_PRESETS = [
  "Drink 3L water daily",
  "Quit sugar completely",
  "Learn Rust & Go",
  "Save $100k",
  "Wake up at 5AM",
  "Become a crypto whale",
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

      // REALITY ENGINE 2.0
      const text = input.toLowerCase()
      let baseScore = 50
      let multiplier = 1.0
      let matchCount = 0

      // 1. Keyword Analysis with Negation Handling
      const words = text.split(/\s+/)
      const negationWords = ['not', "won't", "don't", 'stop', 'quit', 'no', 'never']

      // Heuristic Scoring
      Object.keys(REALITY_WEIGHTS).forEach(key => {
        if (text.includes(key)) {
          // Check for local negation
          // We check if a negation word appears *before* this match in the raw text index
          const negIndex = words.findIndex(w => negationWords.includes(w))
          const keyIndex = text.indexOf(key)

          let weight = REALITY_WEIGHTS[key]

          // Smart Negation: If "not" appears ~15 chars before the keyword, FLIP the weight
          if (negIndex !== -1 && keyIndex > -1 && MatchIsNegated(text, key, negationWords)) {
            weight = -weight * 0.5; // Flip it and reduce impact slightly
            console.log(`Negation detected for ${key}: New weight ${weight}`)
          }

          baseScore += weight
          matchCount++
        }
      })

      // 2. Intensity Multipliers
      Object.keys(INTENSITY_MULTIPLIERS).forEach(key => {
        if (text.includes(key)) {
          multiplier *= INTENSITY_MULTIPLIERS[key]
          matchCount++
        }
      })

      // 3. Final Calculation
      let finalScore = baseScore * multiplier
      finalScore = Math.min(Math.max(finalScore, 5), 100)
      finalScore = Math.round(finalScore)

      // 4. Categorization & Roast Selection
      let category = 'optimistic'
      let roastPool = ROASTS.optimistic

      if (finalScore >= 80) {
        category = 'achievable'
        roastPool = ROASTS.achievable
      } else if (finalScore <= 35) {
        category = 'delusional'
        roastPool = ROASTS.delusional
      }

      // Context-Aware Roasts
      if (text.includes('code') || text.includes('app') || text.includes('api') || text.includes('rust')) {
        roastPool = [...roastPool, ...ROASTS.developer]
      } else if (text.includes('crypto') || text.includes('stock') || text.includes('trade') || text.includes('money')) {
        roastPool = [...roastPool, ...ROASTS.trader]
      } else if (text.includes('study') || text.includes('exam') || text.includes('gpa') || text.includes('school')) {
        roastPool = [...roastPool, ...ROASTS.student]
      }

      // Safely get roast
      if (!roastPool || roastPool.length === 0) roastPool = ROASTS.optimistic
      const roast = roastPool[Math.floor(Math.random() * roastPool.length)]

      // 5. Confidence Score (Simple Heuristic for now)
      const confidence = Math.min(matchCount * 15 + (text.length > 20 ? 10 : 0), 99)

      if (isMatrix) {
        // Matrix Theme Overrides
        if (category === 'delusional') finalScore = 1; // Agent Smith says no
        if (category === 'achievable') finalScore = 99; // The One
      }

      const newResult = { category, score: finalScore, roast, confidence }
      setResult(newResult)
      setHistory(prev => [newResult, ...prev])

      if (category === 'achievable') {
        playSuccess()
        triggerConfetti()
      } else if (category === 'delusional') {
        playFail()
      } else {
        playSuccess() // Neutral/Optimistic sound
      }

    }, 800)
  }

  // Helper for negation detection
  const MatchIsNegated = (fullText, keyword, negationList) => {
    const idx = fullText.indexOf(keyword);
    if (idx < 3) return false;

    const precedingText = fullText.substring(Math.max(0, idx - 15), idx); // Check last 15 chars
    return negationList.some(neg => precedingText.includes(neg));
  }


  const reset = () => {
    playClick()
    setResult(null)
    setInput('')
    setLoading(false)
  }

  // Reusable helper for generating the image canvas
  const generateResultCanvas = async () => {
    if (!resultCardRef.current) return null;

    return await html2canvas(resultCardRef.current, {
      backgroundColor: '#1a0b2e',
      scale: 3,
      useCORS: true,
      logging: false, // Cleaner logs
      onclone: (clonedDoc) => {
        // Fix for Glitch Text: Remove the class to prevent overlapping/distorted text
        const glitchElement = clonedDoc.querySelector('.glitch-text');
        if (glitchElement) {
          glitchElement.classList.remove('glitch-text');
          glitchElement.style.textShadow = 'none';
          glitchElement.style.color = '#ffffff';
        }

        // Ensure Input Text is highly visible
        const italicText = clonedDoc.querySelector('.italic');
        if (italicText) {
          italicText.style.color = '#fff';
          italicText.style.textShadow = '0 2px 10px rgba(0,0,0,0.5)';
        }
      }
    });
  };

  const downloadCard = async () => {
    playClick()
    try {
      console.log("Starting download capture...")
      const canvas = await generateResultCanvas();
      if (!canvas) return;

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `vibe-check-result-${Date.now()}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Download failed:", err)
      alert("Oops! Could not save the image.")
    }
  }

  const shareResult = async () => {
    playClick();
    try {
      console.log("Starting share capture...");
      const canvas = await generateResultCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'vibe-check-result.png', { type: 'image/png' });
        const shareData = {
          files: [file],
          title: '2026 Resolution Reality Check',
          text: `My 2026 Reality Check: ${result.category.toUpperCase()}! 🤖 Reality Score: ${result.score}% Result: "${result.roast}" Check your 2026 vibe here: https://sheta-darshan.github.io/vibe-check-bot/`,
          url: 'https://sheta-darshan.github.io/vibe-check-bot/'
        };

        if (navigator.share && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback: Copy Image or Text to Clipboard
          try {
            // Try copying image to clipboard if supported (Desktop)
            const item = updateClipboardItem(blob);
            await navigator.clipboard.write([item]);
            alert("Image copied to clipboard! Paste it anywhere to share.");
          } catch (clipboardErr) {
            // Ultimate fallback: Copy text only
            await navigator.clipboard.writeText(shareData.text);
            alert("Result text copied to clipboard! (Image sharing not supported on this device)");
          }
        }
      }, 'image/png');
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Helper for clipboard image copy
  const updateClipboardItem = (blob) => {
    return new ClipboardItem({ [blob.type]: blob });
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
              shareResult={shareResult}
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
