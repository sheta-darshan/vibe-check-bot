import React from 'react';

const Header = ({ isMatrix }) => {
    return (
        <div className="text-center mb-8">
            <h1 className={`text-4xl md:text-5xl font-black mb-2 bg-clip-text text-transparent drop-shadow-lg tracking-tighter italic transform -skew-x-6 ${isMatrix ? 'bg-green-500' : 'bg-gradient-to-r from-neon-blue via-neon-pink to-neon-gold'}`}>
                2026 VIBE CHECK
            </h1>
            <p className="text-neon-blue/70 text-[10px] md:text-xs tracking-[0.3em] uppercase font-mono border-b border-neon-blue/20 pb-4 inline-block">Resolution Reality Engine™ v3.0</p>
        </div>
    );
};

export default Header;
