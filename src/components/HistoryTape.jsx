import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const HistoryTape = ({ history }) => {
    if (history.length === 0) return null;

    return (
        <div className="w-full max-w-4xl relative z-20 mt-8 mb-12">
            <h3 className="text-center text-neon-blue text-xs font-bold tracking-widest mb-4 flex items-center justify-center gap-2">
                <Clock className="w-3 h-3" /> SESSION HISTORY
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x slider-scrollbar">
                {history.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`min-w-[200px] p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm flex-shrink-0 snap-center ${item.category === 'delusional' ? 'border-red-500/20' :
                                item.category === 'optimistic' ? 'border-yellow-500/20' :
                                    'border-green-500/20'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] font-bold uppercase py-1 px-2 rounded-full ${item.category === 'delusional' ? 'bg-red-500/20 text-red-400' :
                                    item.category === 'optimistic' ? 'bg-yellow-500/20 text-yellow-300' :
                                        'bg-green-500/20 text-green-300'
                                }`}>{item.category}</span>
                            <span className="text-xs font-mono text-gray-500">{item.score}%</span>
                        </div>
                        <p className="text-xs text-gray-300 line-clamp-2 italic">"{item.input}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HistoryTape;
