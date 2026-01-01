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
import useTTS from './hooks/useTTS'
import { analyzeResolutionLogic } from './utils/realityEngine'

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

const TRENDING_PRESETS = [
  "Drink 3L water daily",
  "Quit sugar completely",
  "Learn Rust & Go",
  "Save $100k",
  "Wake up at 5AM",
  "Become a crypto whale",
  "Wake up at 5AM",
  "Become a crypto whale",
]

const VIBE_ROULETTE = [
  "Marry a rich old man",
  "Quit my job to sell feet pics",
  "Become a spiritual life coach",
  "Move to Bali and finding myself",
  "Launch a podcast about nothing",
  "Trade crypto until I'm homeless",
  "Become a full-time influencer",
  "Only drink raw milk",
];

function App() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const [result, setResult] = useState(null)
  const [isSharing, setIsSharing] = useState(false)

  // Initialize history from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('vibeCheckHistory')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  const [isMatrix, setIsMatrix] = useState(false)

  const inputRef = useRef(null)
  const resultCardRef = useRef(null)
  const { enabled: audioEnabled, setEnabled: setAudioEnabled, playHover, playClick, playSuccess, playFail } = useInternalAudio()
  const { speak, isSpeaking } = useTTS()

  useEffect(() => {
    if (input.toLowerCase().includes('matrix')) {
      setIsMatrix(true)
    } else if (input.toLowerCase().includes('reset')) {
      setIsMatrix(false)
    }
  }, [input])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vibeCheckHistory', JSON.stringify(history))
  }, [history])

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: isMatrix ? ['#00FF00', '#003300'] : ['#FFD700', '#FF00FF', '#00FFFF'],
      disableForReducedMotion: true
    })
  }

  /**
   * Main function to analyze the user's input/resolution.
   * - Plays click sound
   * - Sets loading state with rotation messages
   * - Calls the separated logic engine (analyzeResolutionLogic)
   * - Updates result state and history
   * - Triggers confetti/sound effects based on result category
   */
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

      // Use the separated logic engine
      const newResult = analyzeResolutionLogic(input, isMatrix)

      setResult(newResult)
      setHistory(prev => [newResult, ...prev])

      if (newResult.category === 'achievable') {
        playSuccess()
        triggerConfetti()
      } else if (newResult.category === 'delusional') {
        playFail()
      } else {
        playSuccess() // Neutral/Optimistic sound
      }

    }, 800)
  }

  const reset = () => {
    playClick()
    setResult(null)
    setInput('')
    setLoading(false)
  }

  const clearHistory = () => {
    playClick()
    if (confirm('Are you sure you want to delete your vibe history?')) {
      setHistory([])
      localStorage.removeItem('vibeCheckHistory')
    }
  }

  // Reusable helper for generating the image canvas
  /**
   * Capture the ResultCard as an image using html2canvas.
   * @returns {Promise<HTMLCanvasElement|null>} The generated canvas or null if ref is missing.
   */
  const generateResultCanvas = async () => {
    if (!resultCardRef.current) return null;

    return await html2canvas(resultCardRef.current, {
      backgroundColor: '#1a0b2e',
      scale: 2, // Reduced from 3 to prevent mobile crashes and large file sizes
      useCORS: true,
      logging: false, // Cleaner logs
      onclone: (clonedDoc) => {
        // Ensure Input Text is highly visible
        const italicText = clonedDoc.querySelector('.italic');
        if (italicText) {
          italicText.style.color = '#fff';
          italicText.style.textShadow = '0 2px 10px rgba(0,0,0,0.5)';
        }
      }
    });
  };

  const handleRoulette = () => {
    playClick();
    const random = VIBE_ROULETTE[Math.floor(Math.random() * VIBE_ROULETTE.length)];
    setInput(random);
  }

  const downloadCard = async (mode = 'standard') => {
    playClick()
    try {
      console.log("Starting download capture...")
      const cardCanvas = await generateResultCanvas();
      if (!cardCanvas) return;

      let finalCanvas = cardCanvas;

      // STORY MODE (9:16)
      if (mode === 'story') {
        const width = 1080;
        const height = 1920;
        finalCanvas = document.createElement('canvas');
        finalCanvas.width = width;
        finalCanvas.height = height;
        const ctx = finalCanvas.getContext('2d');

        // Draw Cyber Background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1a0b2e');
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add Glow
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 50;
        ctx.fillStyle = 'rgba(255, 0, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 400, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Center the Card
        const scale = Math.min((width - 100) / cardCanvas.width, 1); // Fit width with padding
        const drawWidth = cardCanvas.width * scale;
        const drawHeight = cardCanvas.height * scale;
        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        ctx.drawImage(cardCanvas, x, y, drawWidth, drawHeight);

        // Branding
        ctx.font = 'bold 40px Courier New';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText("AUDIT YOUR DELUSIONS", width / 2, y + drawHeight + 100);
        ctx.font = '30px Courier New';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
        ctx.fillText("sheta-darshan.github.io/vibe-check-bot", width / 2, height - 100);
      }

      const dataUrl = finalCanvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `vibe-check-${mode}-${Date.now()}.png`
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
    if (isSharing) return;
    setIsSharing(true);

    try {
      console.log("Starting share capture...");
      // Small delay to allow UI to update to "Generating" state
      await new Promise(resolve => setTimeout(resolve, 50));

      const canvas = await generateResultCanvas();
      if (!canvas) throw new Error("Canvas generation failed");

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        const file = new File([blob], 'vibe-check-result.jpg', { type: 'image/jpeg' });
        const shareData = {
          text: `My 2026 Reality Audit: ${result.category.toUpperCase()}! 📋 Score: ${result.score}% "${result.roast}" #VibeAuditor https://sheta-darshan.github.io/vibe-check-bot/`
        };

        // 1. Silent Copy to Clipboard (Backup)
        try {
          const item = new ClipboardItem({ [blob.type]: blob });
          navigator.clipboard.write([item]).catch(() => { }); // Try image
          navigator.clipboard.writeText(shareData.text).catch(() => { }); // Try text
        } catch (e) {
          // IOS specific backup
          navigator.clipboard.writeText(shareData.text).catch(() => { });
        }

        // 2. Native Share
        if (navigator.share && navigator.canShare({ files: [file], text: shareData.text })) {
          try {
            await navigator.share({
              files: [file],
              text: shareData.text
            });
          } catch (shareErr) {
            if (shareErr.name !== 'AbortError') {
              console.error("Native share failed:", shareErr);
            }
          }
        } else {
          // If native share fails/unsupported, we silently relied on clipboard
          alert("Image copied to clipboard! (Sharing not supported)");
        }
        setIsSharing(false);
      }, 'image/jpeg', 0.8);
    } catch (err) {
      console.error("Share failed:", err);
      setIsSharing(false);
      alert("Could not generate image. Try downloading underneath.");
    }
  };

  // Separated fallback logic
  const fallbackShare = async (blob, shareData) => {
    // Just copy to clipboard silently
    try {
      const item = updateClipboardItem(blob);
      await navigator.clipboard.write([item]);
    } catch (clipboardErr) {
      await navigator.clipboard.writeText(shareData.text);
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
                <label className="block text-neon-blue text-xs font-bold mb-2 ml-1 tracking-widest">SUBMIT YOUR DELUSION</label>
                <textarea
                  ref={inputRef}
                  className="w-full bg-black/40 border border-neon-purple/30 rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-transparent transition-all min-h-[120px] resize-none text-base md:text-lg shadow-inner font-mono backdrop-blur-sm"
                  placeholder='e.g., "Become a billionaire" (lol), "Wake up at 5AM", "Quit sugar"...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onMouseEnter={playHover}
                />

                {/* Vibe Roulette */}
                <button
                  onClick={handleRoulette}
                  className="absolute right-2 top-2 text-[10px] md:text-xs font-mono text-neon-pink hover:text-white transition-colors opacity-70 hover:opacity-100 bg-black/20 px-2 py-1 rounded"
                  title="Random Vibe"
                >
                  🎲 ROULETTE
                </button>
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
                AUDIT MY LIFE
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
              shareResult={shareResult}
              isSharing={isSharing}
              playHover={playHover}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          )}

        </motion.div>
      </AnimatePresence>

      <div className="relative w-full max-w-4xl">
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="absolute right-0 top-10 z-30 text-[10px] text-gray-500 hover:text-red-400 font-mono underline cursor-pointer"
          >
            SHRED EVIDENCE
          </button>
        )}
        <HistoryTape history={history} />
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 text-center w-full text-[10px] text-gray-600 font-mono uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity pointer-events-none">
        © 2026 Darshankumar Sheta • METAPHYSICAL REFUNDS DENIED
      </div>
    </div>
  )
}

export default App
