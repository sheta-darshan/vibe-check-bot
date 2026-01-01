import { useState, useCallback, useEffect } from 'react';

const useTTS = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            setSupported(true);
        }
    }, []);

    const speak = useCallback((text) => {
        if (!supported || !text) return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find a "good" voice (Google US English, or Microsoft David/Zira)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            v.name.includes('Google US English') ||
            v.name.includes('Samantha') ||
            v.lang === 'en-US'
        );

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.pitch = 0.9; // Slightly lower for that "judgey" tone
        utterance.rate = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [supported]);

    const cancel = useCallback(() => {
        if (supported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [supported]);

    return { speak, cancel, isSpeaking, supported };
};

export default useTTS;
