import React from 'react';
import { motion } from 'framer-motion';

const ReceiptCard = ({ result, input, timestamp }) => {
    const delusionTax = 100 - result.score;
    const serviceFee = 5.00;
    const total = (delusionTax + serviceFee).toFixed(2);

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#eee] text-black font-mono p-6 w-full max-w-sm mx-auto shadow-xl relative overflow-hidden"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%)"
            }}
        >
            {/* Header */}
            <div className="text-center border-b-2 border-dashed border-black pb-4 mb-4">
                <h2 className="text-2xl font-black tracking-tighter">REALITY CORP.</h2>
                <p className="text-xs uppercase">Store #2026 • Term: Q1</p>
                <p className="text-xs">{timestamp}</p>
            </div>

            {/* Items */}
            <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                    <span className="uppercase font-bold truncate pr-4">ITEM: {input}</span>
                    <span>$0.00</span>
                </div>

                {delusionTax > 0 && (
                    <div className="flex justify-between">
                        <span>DELUSION TAX ({(delusionTax)}%)</span>
                        <span>${delusionTax.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between">
                    <span>SERVICE FEE</span>
                    <span>${serviceFee.toFixed(2)}</span>
                </div>

                {result.forecast && (
                    <div className="text-xs text-black/70 italic pt-2 border-t border-dashed border-black/20 mt-2">
                        "{result.forecast}"
                    </div>
                )}

                <div className="flex justify-between text-xs text-gray-500 italic pt-1 mt-2">
                    <span>STATUS</span>
                    <span className="uppercase">{result.category}</span>
                </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-dashed border-black pt-2 mb-6">
                <div className="flex justify-between text-xl font-bold">
                    <span>TOTAL</span>
                    <span>${total}</span>
                </div>
                <div className="text-center text-xs mt-1 uppercase">
                    (Paid with Dignity)
                </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-2">
                <p className="text-[10px] uppercase">Thank you for validating your existence.</p>
                <p className="text-[10px] uppercase font-bold">NO REFUNDS.</p>

                {/* CSS Barcode */}
                <div className="h-12 w-3/4 mx-auto bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px,black_4px,black_8px,transparent_8px,transparent_9px)] mt-4 opacity-80" />
                <p className="text-[8px] tracking-[0.5em] mt-1">{Math.random().toString(36).substring(2, 12).toUpperCase()}</p>
            </div>
        </motion.div>
    );
};

export default ReceiptCard;
