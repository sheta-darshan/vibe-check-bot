import { normalizeText, tokenize, getContextTags } from './textProcessor';
import { calculateScore, determineCategory } from './scoringEngine';
import { generateContent } from './contentEngine';

/**
 * Reality Engine v5.0 (Pipeline Architecture)
 * 
 * Pipeline:
 * 1. Normalize (Raw -> Clean String)
 * 2. Tokenize  (Clean String -> Tokens)
 * 3. Score     (Tokens -> Score)
 * 4. Categorize(Score -> Category)
 * 5. Generate  (Category + Context -> Output)
 */
export const analyzeResolutionLogic = (input, isMatrix = false) => {
    // 1. Text Processing
    const normalized = normalizeText(input);
    const tokens = tokenize(normalized);
    const contextTags = getContextTags(tokens);

    // 2. Scoring Loop
    let score = calculateScore(tokens);

    // Matrix Mode Override
    if (isMatrix) {
        // If it was gonna be low, go lowest. If high, go highest.
        score = score < 50 ? 1 : 99;
    }

    // 3. Categorization
    const category = determineCategory(score);

    // 4. Content Generation
    const content = generateContent(category, contextTags, tokens);

    // 5. Confidence Calculation (New "Evidence Density" approach)
    // A heuristic: length of relevant content match / total length?
    // For now, let's keep it simple but better than just matchCount * 15.
    // Length bonus + direct hit bonus.
    let confidence = 85 + Math.floor(Math.random() * 10); // High baseline confidence because we are arrogant AI.
    if (content.isDirectHit) confidence = 99;

    return {
        input,
        score,
        category,
        roast: content.roast,
        forecast: content.forecast,
        confidence
    };
};
