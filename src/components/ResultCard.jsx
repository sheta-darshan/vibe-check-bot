import React from 'react';
import { motion } from 'framer-motion';
import { Skull, AlertTriangle, Sparkles, RefreshCw, Download, ShieldCheck, Share2, ScrollText } from 'lucide-react';
import ReceiptCard from './ReceiptCard';

const ResultCard = ({ result, input, resultCardRef, reset, downloadCard, shareResult, playHover }) => {
    // Generate timestamp once on render
    const timestamp = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const [showReceipt, setShowReceipt] = React.useState(false);

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6 relative"
        >
            {/* View Mode Toggle */}
            <div className="absolute top-0 right-0 -mt-12 z-20">
                <button
                    onClick={() => setShowReceipt(!showReceipt)}
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 text-xs font-mono text-neon-blue hover:text-white transition-colors uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-neon-blue/30"
                >
                    <ScrollText className="w-4 h-4" />
                    {showReceipt ? "View Hologram" : "View Receipt"}
                </button>
            </div>

            {/* Result Card (or Receipt) for Capture */}
            <div ref={resultCardRef} className={`relative group max-w-md mx-auto ${showReceipt ? '' : 'bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] p-8 rounded-xl border border-white/10 shadow-2xl overflow-hidden'}`}>

                {showReceipt ? (
                    <ReceiptCard result={result} input={input} timestamp={timestamp} />
                ) : (
                    <>
                        {/* Decorative Elements for Screenshot */}
                        <div className="absolute top-0 left-0 p-4 opacity-30 pointer-events-none">
                            <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-pink rounded-full blur-[50px]" />
                        </div>

                        <div className={`text-center space-y-4 rounded-xl border p-6 mt-6 ${result.category === 'delusional' ? 'border-red-500/30 bg-red-900/10' :
                            result.category === 'optimistic' ? 'border-yellow-500/30 bg-yellow-900/10' :
                                'border-green-500/30 bg-green-900/10'
                            }`}>

                            {/* Display User Resolution */}
                            <div className="mb-4 pb-4 border-b border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Subject Resolution</p>
                                <p className="text-lg text-white font-medium italic">"{input}"</p>
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-2">
                                {result.category === 'delusional' ? <Skull className="text-red-500 w-8 h-8" /> :
                                    result.category === 'optimistic' ? <AlertTriangle className="text-yellow-400 w-8 h-8" /> :
                                        <Sparkles className="text-green-400 w-8 h-8" />}
                                <span className={`text-xl font-black uppercase tracking-widest ${result.category === 'delusional' ? 'text-red-400' :
                                    result.category === 'optimistic' ? 'text-yellow-300' :
                                        'text-green-300'
                                    }`}>
                                    {result.category}
                                </span>
                            </div>

                            <div className="relative h-6 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.score}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`absolute top-0 left-0 h-full ${result.score < 40 ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.7)]' :
                                        result.score < 80 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.7)]' :
                                            'bg-gradient-to-r from-green-600 to-neon-green shadow-[0_0_15px_rgba(57,255,20,0.7)]'
                                        }`}
                                />
                            </div>
                            <p className="text-xs text-gray-400 font-mono flex justify-between px-2 pt-1">
                                <span>DELUSION</span>
                                <span className="font-bold text-white">REALITY SCORE: {result.score}%</span>
                                <span>REALITY</span>
                            </p>

                            {/* Vibe Forecast */}
                            {result.forecast && (
                                <div className="mt-4 pt-3 border-t border-white/5 mx-2">
                                    <p className="text-[11px] text-neon-blue font-mono text-left tracking-tight animate-pulse">
                                        {result.forecast}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 p-4 text-center">
                            <p className={`text-2xl font-bold leading-tight ${result.category === 'delusional' ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-gray-100'}`}>
                                "{result.roast}"
                            </p>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-end">
                            <div className="text-left">
                                <div className="text-[10px] text-gray-500 font-mono mb-1">resolution_hash_#2026</div>
                                <div className="text-xs text-neon-blue font-bold tracking-widest">
                                    VIBE-CHECK-BOT • {result.confidence}% CONFIDENCE
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-500 font-mono">{timestamp}</div>
                                {/* Removed Official Analysis Text */}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Actions: New Layout */}
            <div className="flex flex-col gap-3 max-w-md mx-auto">
                {/* Primary Action: Try Again */}
                <button
                    onClick={reset}
                    onMouseEnter={playHover}
                    aria-label="Try Again"
                    className="w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg border border-white/5"
                >
                    <RefreshCw className="w-4 h-4" /> Try Another Resolution
                </button>

                {/* Secondary Actions: Share & Download */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={shareResult}
                        onMouseEnter={playHover}
                        aria-label="Share Result"
                        className="py-3 px-4 rounded-lg bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-pink border border-neon-pink/30 font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(255,0,255,0.2)]"
                    >
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button
                        onClick={downloadCard}
                        onMouseEnter={playHover}
                        aria-label="Save Proof"
                        className="py-3 px-4 rounded-lg bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                    >
                        <Download className="w-4 h-4" /> {showReceipt ? "Save Receipt" : "Save Proof"}
                    </button>
                </div>
            </div>

        </motion.div>
    );
};

export default ResultCard;
