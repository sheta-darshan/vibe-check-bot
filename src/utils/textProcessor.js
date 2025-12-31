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
    const tokenStr = tokens.join(' ');

    if (tokenStr.includes('code') || tokenStr.includes('app') || tokenStr.includes('api') || tokenStr.includes('dev')) tags.add('career');
    if (tokenStr.includes('crypto') || tokenStr.includes('stock') || tokenStr.includes('trade')) tags.add('crypto');
    if (tokenStr.includes('love') || tokenStr.includes('date') || tokenStr.includes('marry') || tokenStr.includes('crush') || tokenStr.includes('ex')) tags.add('love');
    if (tokenStr.includes('job') || tokenStr.includes('work') || tokenStr.includes('boss') || tokenStr.includes('hustle')) tags.add('career');
    if (tokenStr.includes('diet') || tokenStr.includes('eat') || tokenStr.includes('food') || tokenStr.includes('vegan') || tokenStr.includes('keto')) tags.add('diet');

    return Array.from(tags);
};
