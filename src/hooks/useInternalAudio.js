import { useState, useRef } from 'react';

const useInternalAudio = () => {
    const [enabled, setEnabled] = useState(true);
    const audioCtxRef = useRef(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    const playTone = (freq, type, duration, vol = 0.1) => {
        if (!enabled || !audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + duration);
    };

    const playHover = () => {
        initAudio();
        if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();
        playTone(800, 'sine', 0.05, 0.05);
    };
    const playClick = () => {
        initAudio();
        playTone(300, 'square', 0.1, 0.1);
    };
    const playSuccess = () => {
        initAudio();
        setTimeout(() => playTone(600, 'sine', 0.1), 0);
        setTimeout(() => playTone(800, 'sine', 0.1), 100);
        setTimeout(() => playTone(1200, 'sine', 0.3), 200);
    };
    const playFail = () => {
        initAudio();
        playTone(100, 'sawtooth', 0.5, 0.2);
        setTimeout(() => playTone(80, 'sawtooth', 0.5, 0.2), 100);
    };

    return { enabled, setEnabled, playHover, playClick, playSuccess, playFail };
};

export default useInternalAudio;
