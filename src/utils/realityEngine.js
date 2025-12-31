
// Constants
const REALITY_WEIGHTS = {
    // Delusional (Negative Weights)
    'billionaire': -60, 'millionaire': -40, 'trillionaire': -80, 'never': -30,
    'always': -30, 'quit job': -50, 'perfect': -40, 'ceo': -40, 'astronaut': -60,
    'marry': -40, 'famous': -50, 'hollywood': -60, 'president': -80, 'mars': -70,
    'lottery': -90, 'passive income': -40, 'crypto': -30, '100%': -20,
    'quit sugar': -40, 'no sugar': -40, 'six pack': -30, 'abs': -20,

    // Realistic/Achievable (Positive Weights)
    'water': 25, 'walk': 20, 'sleep': 25, 'friend': 15, 'eat': 10, 'vegetable': 20,
    'fruit': 20, 'try': 15, 'maybe': 10, 'once': 10, 'book': 15, 'class': 15,
    'call': 20, 'mom': 25, 'dad': 25, 'text': 15, 'clean': 20, 'drink': 10,
    'study': 15, 'save': 15, 'invest': 10, 'floss': 30,

    // Optimistic (Neutral/Slight Positive)
    'gym': 5, 'run': 5, 'code': 5, 'learn': 10, 'read': 10, 'job': 10,
    'promotion': 5, 'language': 5, 'meditate': 10, 'diet': 0
}

const INTENSITY_MULTIPLIERS = {
    'daily': 0.85, 'every': 0.85, 'day': 0.9, 'always': 0.5, 'never': 0.5,
    'completely': 0.6, 'forever': 0.4, 'strictly': 0.7, 'perfectly': 0.5,
    '100%': 0.6
}

const FORECASTS = {
    achievable: [
        "Outlook: Sunny with a chance of actual success.",
        "Outlook: Boring but stable. Invest in mutual funds.",
        "Outlook: Surprisingly high probability of survival.",
        "Outlook: Signs point to yes, but don't get cocky.",
    ],
    delusional: [
        "Outlook: Apocalyptic. Seek shelter immediately.",
        "Outlook: 404 Reality Not Found. Please reboot your brain.",
        "Outlook: You have a better chance of fighting a bear.",
        "Outlook: Failure imminent. Prepare snacks.",
    ],
    optimistic: [
        "Outlook: Hazy. Ask again after your morning coffee.",
        "Outlook: 50/50. Flip a coin or call your therapist.",
        "Outlook: Requires effort. Proceed with caution.",
    ],
    crypto: [
        "Outlook: High volatility. HODL your tears.",
        "Outlook: Rug pull likely. Don't check your wallet.",
        "Outlook: To the moon? More like to the doom.",
    ],
    love: [
        "Outlook: Ghosting likely. Prepare ice cream.",
        "Outlook: You will die alone, but with cats.",
        "Outlook: Their red flags are not a carnival attraction.",
        "Outlook: Texting them back is a strategic error.",
    ],
    career: [
        "Outlook: HR is already writing the email.",
        "Outlook: Burnout is just excitement leaving the body.",
        "Outlook: Sunday Scaries will reach critical mass.",
    ],
    diet: [
        "Outlook: Cheat day is coming. It's today.",
        "Outlook: Kale tastes like sadness. Good luck.",
        "Outlook: Pizza is calling. Do not answer.",
    ]
}

const DIRECT_HITS = {
    'gym': [
        "We both know you're canceling that membership in Feb.",
        "Don't buy the outfit before you do the workout.",
        "Planet Fitness doesn't count as a personality trait.",
    ],
    'marathon': [
        "Your knees already filed a restraining order.",
        "Running away from your problems? Classic.",
        "The only thing you're running is out of excuses.",
    ],
    'startup': [
        "Is it an AI wrapper? Be honest.",
        "Pre-revenue or pre-reality?",
        "Let me guess, you're the 'Idea Guy'?",
        "Disrupting the industry? How about disrupting your sleep schedule first.",
    ],
    'tiktok': [
        "Viral fame isn't a retirement plan.",
        "Please, no more POV videos.",
        "The algorithm hates you, and so do I.",
    ],
    // New Categories
    'ex': [
        "They blocked you for a reason.",
        "Texting them is a violation of the Geneva Convention.",
        "Closure is a myth. Move on.",
    ],
    'crush': [
        "They don't know you exist.",
        "Stop analyzing their Instagram stories.",
        "Simping is not a tax write-off.",
    ],
    'keto': [
        "Enjoy your breath smelling like acetone.",
        "Bread misses you too.",
        "Is butter a carb?",
    ],
    'vegan': [
        "We get it, you're vegan.",
        "Plants have feelings too (probably not).",
        "Where do you get your protein? (Just kidding, nobody cares).",
    ],
    'boss': [
        "Asking for a raise? In this economy?",
        "They are definitely not 'like a family'.",
        "Work-life balance is a myth invented by HR.",
    ],
    'save': [
        "Stop buying $8 coffees then.",
        "Avocado toast is the root of all evil.",
        "Your savings account is laughing at you.",
    ]
}

const ROASTS = {
    achievable: [
        "Wow, a reasonable human being. Rare.",
        "Boring, but you'll actually do it.",
        "Look at you, setting the bar at ankle height. Respect.",
        "This is so doable I almost fell asleep reading it.",
        "2026 might actually be your year?",
        "Sensible. Functioning adult energy.",
    ],
    optimistic: [
        "I love the energy, but let's see how long it lasts.",
        "Ambitious. Good luck.",
        "This smells like a 'New Year, New Me' Instagram post.",
        "A bit stretch, but not entirely impossible. Maybe.",
    ],
    delusional: [
        "Billionaire by Feb? Okay, settle down Elon.",
        "I admire the sheer lack of connection to reality.",
        "This resolution has higher inflation than the economy.",
        "Did you hit your head, or is this a cry for help?",
        "Pure sci-fi. I love it.",
        "Sir, this is a Wendy's.",
    ],
    developer: [
        "Git push --force your life?",
        "You can't sudo make me believe that.",
        "404: Willpower not found.",
        "It works on my machine... but not in your life.",
    ],
    trader: [
        "Leverage 100x on verify failure.",
        "Liquidation price hit immediately.",
        "Buy high, sell your dreams low.",
    ],
    // New Categories
    love: [
        "Love is in the air? No, that's just pollution.",
        "Tinder is not a hobby.",
        "Your soulmate is currently avoiding you.",
    ],
    career: [
        "Quiet quitting is just doing your job.",
        "LinkedIn is not real life.",
        "Rise and grind? More like rise and cry.",
    ],
    diet: [
        "Calories don't count on weekends (false).",
        "Your metabolism is slowing down as we speak.",
        "Eating greens won't fix your red flags.",
    ]
}

const CONTRACTION_MAP = {
    "don't": "do not",
    "won't": "will not",
    "can't": "cannot",
    "shouldn't": "should not",
    "wouldn't": "would not",
    "couldn't": "could not",
    "isn't": "is not",
    "aren't": "are not",
    "haven't": "have not",
    "hasn't": "has not",
    "hadn't": "had not",
    "didn't": "did not"
};

// Robust Negation Helper
const getRobustNegation = (tokens, keyword, negationList) => {
    const keyTokens = keyword.toLowerCase().split(/[^a-z0-9]+/);
    const firstKeyWord = keyTokens[0];

    // Find all indices of the first word of the keyword
    const startIndices = tokens.reduce((acc, token, index) => {
        if (token === firstKeyWord) acc.push(index);
        return acc;
    }, []);

    // Check sliding window for each valid occurrence
    for (const dataIndex of startIndices) {
        // Verify full phrase match if multi-word
        let isMatch = true;
        for (let i = 1; i < keyTokens.length; i++) {
            if (tokens[dataIndex + i] !== keyTokens[i]) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            const start = Math.max(0, dataIndex - 3);
            const window = tokens.slice(start, dataIndex);
            if (window.some(token => negationList.includes(token))) {
                return true;
            }
        }
    }
    return false;
}

export const analyzeResolutionLogic = (input, isMatrix = false) => {
    const text = input.toLowerCase()
    let baseScore = 50
    let multiplier = 1.0
    let matchCount = 0

    // Direct Hit Check
    let directHitRoasts = []
    let directHitKeyword = ''

    Object.keys(DIRECT_HITS).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'i');
        if (regex.test(text)) {
            directHitRoasts = [...directHitRoasts, ...DIRECT_HITS[key]]
            directHitKeyword = key
        }
    })

    // 1. Keyword Analysis & Negation
    // Normalize and Expand Contractions
    let normalizedText = text;
    Object.keys(CONTRACTION_MAP).forEach(contraction => {
        const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
        normalizedText = normalizedText.replace(regex, CONTRACTION_MAP[contraction]);
    });

    const tokens = normalizedText.split(/[^a-z0-9]+/); // Tokenize by removing non-alphanumeric chars

    Object.keys(REALITY_WEIGHTS).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'i');
        if (regex.test(text)) {
            let weight = REALITY_WEIGHTS[key];

            // Robust Negation Check
            if (getRobustNegation(tokens, key, ['not', 'no', 'never', 'stop', 'quit', 'avoid', 'cease'])) {
                weight = -weight * 0.5;
            }

            baseScore += weight;
            matchCount++;
        }
    })

    // 2. Intensity
    Object.keys(INTENSITY_MULTIPLIERS).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'i');
        if (regex.test(text)) {
            multiplier *= INTENSITY_MULTIPLIERS[key]
            matchCount++
        }
    })

    // 3. Final Calculation
    let finalScore = baseScore * multiplier
    finalScore = Math.min(Math.max(finalScore, 5), 100)
    finalScore = Math.round(finalScore)

    // 4. Categorization & Roast
    let category = 'optimistic'
    let roastPool = ROASTS.optimistic

    if (directHitRoasts.length > 0) {
        matchCount += 3
        roastPool = directHitRoasts
        if (directHitKeyword === 'startup' || directHitKeyword === 'crypto') {
            if (finalScore > 40) finalScore -= 20;
        }
    }

    if (finalScore >= 80) {
        category = 'achievable'
        if (directHitRoasts.length === 0) roastPool = ROASTS.achievable
    } else if (finalScore <= 35) {
        category = 'delusional'
        if (directHitRoasts.length === 0) roastPool = ROASTS.delusional
    }

    // Context-Aware Roasts & Forecasts
    let contextCategory = '';

    if (directHitRoasts.length === 0) {
        if (text.includes('code') || text.includes('app') || text.includes('api') || text.includes('dev')) {
            roastPool = [...roastPool, ...ROASTS.developer]; contextCategory = 'career';
        } else if (text.includes('crypto') || text.includes('stock') || text.includes('trade')) {
            roastPool = [...roastPool, ...ROASTS.trader]; contextCategory = 'crypto';
        } else if (text.includes('love') || text.includes('date') || text.includes('marry') || text.includes('crush') || text.includes('ex')) {
            roastPool = [...roastPool, ...ROASTS.love]; contextCategory = 'love';
        } else if (text.includes('job') || text.includes('work') || text.includes('boss') || text.includes('hustle')) {
            roastPool = [...roastPool, ...ROASTS.career]; contextCategory = 'career';
        } else if (text.includes('diet') || text.includes('eat') || text.includes('food') || text.includes('vegan') || text.includes('keto')) {
            roastPool = [...roastPool, ...ROASTS.diet]; contextCategory = 'diet';
        }
    }

    if (!roastPool || roastPool.length === 0) roastPool = ROASTS.optimistic
    const roast = roastPool[Math.floor(Math.random() * roastPool.length)]

    // 5. Forecast Generation
    let forecastPool = FORECASTS[category] || FORECASTS.optimistic; // Default to category
    if (contextCategory && FORECASTS[contextCategory]) {
        // Mix generic outlooks with specific ones
        forecastPool = [...forecastPool, ...FORECASTS[contextCategory]];
    }
    const forecast = forecastPool[Math.floor(Math.random() * forecastPool.length)];

    // 6. Confidence Score
    let confidence = Math.min(matchCount * 15 + (text.length > 20 ? 10 : 0), 99)
    if (directHitRoasts.length > 0) confidence = Math.max(confidence, 92 + Math.floor(Math.random() * 7));

    if (isMatrix) {
        if (category === 'delusional') finalScore = 1;
        if (category === 'achievable') finalScore = 99;
    }

    return { category, score: finalScore, roast, forecast, confidence, input }
}
