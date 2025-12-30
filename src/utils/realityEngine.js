
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
    'read': [
        "Buying books isn't reading them.",
        "Audiobooks at 2x speed don't count.",
        "Tsundoku level: Expert.",
    ],
    'write': [
        "ChatGPT is writing it, aren't they?",
        "The world doesn't need another memoir.",
        "Writer's block? Or just laziness?",
    ],
    'travel': [
        "Running away to Bali won't fix your internal monologue.",
        "Digital Nomad? More like Digital Homeless.",
        "Your Instagram needs verify, your wallet needs help.",
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
        "Mom would be proud. I'm bored, but proud.",
    ],
    optimistic: [
        "I love the energy, but let's see how long it lasts.",
        "Gym every day? Who are you, The Rock?",
        "Ambitious. Good luck.",
        "This smells like a 'New Year, New Me' Instagram post.",
        "You're gonna need more caffeine for this one.",
        "A bit stretch, but not entirely impossible. Maybe.",
        "Main Character energy, but do you have the plot armor?",
    ],
    delusional: [
        "Billionaire by Feb? Okay, settle down Elon.",
        "I admire the sheer lack of connection to reality.",
        "This resolution has higher inflation than the economy.",
        "Did you hit your head, or is this a cry for help?",
        "Start by naming variables something other than 'x' first.",
        "Fixing sleep schedule? In this economy? LMAO.",
        "Pure sci-fi. I love it.",
        "Sir, this is a Wendy's.",
        "Have you considered therapy instead?",
    ],
    developer: [
        "Git push --force your life?",
        "You can't sudo make me believe that.",
        "404: Willpower not found.",
        "Reading the docs > Solving life problems.",
        "Refactor your expectations.",
        "Is this deployed to prod or just localhost?",
        "It works on my machine... but not in your life.",
    ],
    trader: [
        "Leverage 100x on verify failure.",
        "Liquidation price hit immediately.",
        "Shorting your success rate.",
        "Buy high, sell your dreams low.",
        "This is financial advice: Don't.",
        "HODLing onto false hope.",
    ],
    student: [
        "GPA is temporary, burnout is forever.",
        "Fixing sleep schedule? In this economy?",
        "Academic weapon? More like academic victim.",
        "Study break is over. Get back to work.",
        "The mitochondria is the powerhouse of your stress.",
    ],
    influencer: [
        "Don't forget to like, comment, and subscribe to reality.",
        "Your engagement rate is lower than your bank account.",
        "Content creator? Create some stability first.",
    ],
    gamer: [
        "Touch grass. Just once. Please.",
        "Lag isn't the reason you're failing.",
        "GG well played, but not in real life.",
    ]
}

// Helper for negation detection
const MatchIsNegated = (fullText, keyword, negationList) => {
    const idx = fullText.indexOf(keyword);
    if (idx < 3) return false;

    const precedingText = fullText.substring(Math.max(0, idx - 15), idx); // Check last 15 chars
    return negationList.some(neg => precedingText.includes(neg));
}

export const analyzeResolutionLogic = (input, isMatrix = false) => {
    const text = input.toLowerCase()
    let baseScore = 50
    let multiplier = 1.0
    let matchCount = 0

    // NEW: Direct Hit Check (Prioritized Specificity)
    let directHitRoasts = []
    let directHitKeyword = ''

    Object.keys(DIRECT_HITS).forEach(key => {
        if (text.includes(key)) {
            directHitRoasts = [...directHitRoasts, ...DIRECT_HITS[key]]
            directHitKeyword = key
        }
    })

    // 1. Keyword Analysis with Negation Handling
    const words = text.split(/\s+/)
    const negationWords = ['not', "won't", "don't", 'stop', 'quit', 'no', 'never']

    // Heuristic Scoring
    Object.keys(REALITY_WEIGHTS).forEach(key => {
        // Robust Matching: Use Regex with Word Boundaries
        // Escaping special characters if any (though unlikely in our key set)
        const regex = new RegExp(`\\b${key}\\b`, 'i');

        if (regex.test(text)) {
            // Check for local negation
            const negIndex = words.findIndex(w => negationWords.includes(w))
            const keyIndex = text.indexOf(key)

            let weight = REALITY_WEIGHTS[key]

            // Smart Negation: If "not" appears ~15 chars before the keyword, FLIP the weight
            if (negIndex !== -1 && keyIndex > -1 && MatchIsNegated(text, key, negationWords)) {
                weight = -weight * 0.5; // Flip it and reduce impact slightly
            }

            baseScore += weight
            matchCount++
        }
    })

    // 2. Intensity Multipliers
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

    // 4. Categorization & Roast Selection
    let category = 'optimistic'
    let roastPool = ROASTS.optimistic

    // Override for Direct Hits: If we found a specific trigger, rely on it
    if (directHitRoasts.length > 0) {
        matchCount += 3
        roastPool = directHitRoasts

        if (directHitKeyword === 'startup' || directHitKeyword === 'crypto') {
            if (finalScore > 40) finalScore -= 20;
        }
    }

    // Standard Categorization
    if (finalScore >= 80) {
        category = 'achievable'
        if (directHitRoasts.length === 0) roastPool = ROASTS.achievable
    } else if (finalScore <= 35) {
        category = 'delusional'
        if (directHitRoasts.length === 0) roastPool = ROASTS.delusional
    }

    // Context-Aware Roasts (Fallback)
    if (directHitRoasts.length === 0) {
        if (text.includes('code') || text.includes('app') || text.includes('api') || text.includes('rust') || text.includes('dev')) {
            roastPool = [...roastPool, ...ROASTS.developer]
        } else if (text.includes('crypto') || text.includes('stock') || text.includes('trade') || text.includes('money') || text.includes('btc')) {
            roastPool = [...roastPool, ...ROASTS.trader]
        } else if (text.includes('study') || text.includes('exam') || text.includes('gpa') || text.includes('school') || text.includes('uni')) {
            roastPool = [...roastPool, ...ROASTS.student]
        } else if (text.includes('viral') || text.includes('tiktok') || text.includes('follower') || text.includes('sub') || text.includes('content')) {
            roastPool = [...roastPool, ...ROASTS.influencer]
        } else if (text.includes('stream') || text.includes('twitch') || text.includes('rank') || text.includes('game') || text.includes('play')) {
            roastPool = [...roastPool, ...ROASTS.gamer]
        }
    }

    // Safely get roast
    if (!roastPool || roastPool.length === 0) roastPool = ROASTS.optimistic
    const roast = roastPool[Math.floor(Math.random() * roastPool.length)]

    // 5. Confidence Score
    let confidence = Math.min(matchCount * 15 + (text.length > 20 ? 10 : 0), 99)
    if (directHitRoasts.length > 0) confidence = Math.max(confidence, 92 + Math.floor(Math.random() * 7));

    if (isMatrix) {
        if (category === 'delusional') finalScore = 1;
        if (category === 'achievable') finalScore = 99;
    }

    return { category, score: finalScore, roast, confidence, input }
}
