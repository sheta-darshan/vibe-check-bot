import { ENGINE_CONFIG } from './engineConfig';

export const normalizeText = (text) => {
    let normalized = text.toLowerCase();

    // Expand Contractions
    Object.keys(ENGINE_CONFIG.CONTRACTIONS).forEach(contraction => {
        const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
        normalized = normalized.replace(regex, ENGINE_CONFIG.CONTRACTIONS[contraction]);
    });

    return normalized;
};

export const tokenize = (text) => {
    // Keep alphanumeric chars and spaces, then split
    // We want to remove punctuation but keep word boundaries clear
    return text.split(/[^a-z0-9]+/).filter(Boolean);
};

export const getContextTags = (tokens) => {
    const tags = new Set();
    // Simple join for checking substrings?
    // Better: Check tokens against mapping arrays

    Object.keys(ENGINE_CONFIG.CONTEXT_MAPPINGS).forEach(context => {
        const keywords = ENGINE_CONFIG.CONTEXT_MAPPINGS[context];
        // Check if ANY keyword exists in tokens
        if (tokens.some(t => keywords.includes(t))) {
            tags.add(context);
        }
    });

    return Array.from(tags);
};
