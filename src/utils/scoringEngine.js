import { ENGINE_CONFIG } from './engineConfig';

const getRobustNegation = (tokens, keyword) => {
    // Basic finding of keyword index in tokens
    const indices = tokens.reduce((acc, t, i) => (t === keyword ? [...acc, i] : acc), []);

    for (const idx of indices) {
        const start = Math.max(0, idx - 3);
        const window = tokens.slice(start, idx);
        if (window.some(w => ENGINE_CONFIG.NEGATION_WORDS.includes(w))) {
            return true;
        }
    }
    return false;
};

export const calculateScore = (tokens) => {
    let score = ENGINE_CONFIG.BASE_SCORE;
    let multiplier = 1.0;

    // Flatten weights for easier lookup
    const allWeights = {
        ...ENGINE_CONFIG.WEIGHTS.DELUSIONAL,
        ...ENGINE_CONFIG.WEIGHTS.REALISTIC,
        ...ENGINE_CONFIG.WEIGHTS.OPTIMISTIC
    };

    // 1. Keyword Weighting
    Object.keys(allWeights).forEach(key => {
        // Simple token matching for single words
        if (tokens.includes(key)) {
            let weight = allWeights[key];
            if (getRobustNegation(tokens, key)) {
                weight = -weight * 0.5;
            }
            score += weight;
        }
        // For multi-word phrases (e.g. "quit job"), we need a quick check against the joined string?
        // OR we just stick to the robust token logic. 
        // For the sake of the refactor, let's prioritize the Robust Logic we just built specific to tokens.
        // If a key implies a phrase like "quit sugar", tokenizing it splits it.
        // This is where "Problem 2" from the user comes in. 
        // Canonical Matching: Let's assume keys are predominantly single words in the config OR we do a phrase check.
        // Re-implementing phrase matching correctly:
        else if (key.includes(' ')) {
            const keyParts = key.split(' ');
            // Check if tokens contain this sequence
            const phraseMatch = tokens.some((_, i) => {
                if (i + keyParts.length > tokens.length) return false;
                return keyParts.every((part, k) => tokens[i + k] === part);
            });

            if (phraseMatch) {
                // Approximate negation check on the first word of the phrase
                let weight = allWeights[key];
                // finding index of first word
                const startIdx = tokens.indexOf(keyParts[0]);
                if (startIdx > -1) {
                    // Check window before phrase
                    const start = Math.max(0, startIdx - 3);
                    const window = tokens.slice(start, startIdx);
                    if (window.some(w => ENGINE_CONFIG.NEGATION_WORDS.includes(w))) {
                        weight = -weight * 0.5;
                    }
                }
                score += weight;
            }
        }
    });

    // 2. Intensity Multipliers
    Object.keys(ENGINE_CONFIG.MULTIPLIERS).forEach(key => {
        if (tokens.includes(key)) {
            multiplier *= ENGINE_CONFIG.MULTIPLIERS[key];
        }
    });

    let finalScore = score * multiplier;
    finalScore = Math.min(Math.max(finalScore, ENGINE_CONFIG.MIN_SCORE), ENGINE_CONFIG.MAX_SCORE);
    return Math.round(finalScore);
};

export const determineCategory = (score) => {
    if (score >= ENGINE_CONFIG.THRESHOLDS.ACHIEVABLE) return 'achievable';
    if (score <= ENGINE_CONFIG.THRESHOLDS.DELUSIONAL) return 'delusional';
    return 'optimistic';
};
