import { generateDynamicRoast } from './dynamicEngine';

export const DIRECT_HITS = {
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
};

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
    ],
    finance: [
        "Your portfolio is redder than your flags.",
        "Buy high, sell low, cry always.",
        "Dropshipping is not a career, it's a donation to Zuckerberg.",
        "Financial freedom? Start with financial literacy.",
        "NF-No.",
    ],
    wellness: [
        "Mental health walk? You mean avoiding responsibilities.",
        "Your chakras are aligned but your life is a mess.",
        "Manifesting checks that you can't cash.",
        "Mercury is not in retrograde, you're just annoying.",
        "Buying crystals won't fix your credit score.",
    ],
    academic: [
        "Due tomorrow? Do tomorrow.",
        "PhD: Permanent Head Damage.",
        "Check Chegg before you wreck yourself.",
        "Academic comeback? You need an academic miracle.",
    ],
    social: [
        "Touch grass. Just once. Please.",
        "Your screen time is higher than your GPA.",
        "Main character syndrome is not a personality.",
        "Do it for the plot? The plot is terrible.",
    ]
};

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
    ],
    finance: [
        "Outlook: Bankruptcy protection filing imminent.",
        "Outlook: IRS has entered the chat.",
        "Outlook: Ramen noodles for dinner. Forever.",
    ],
    wellness: [
        "Outlook: Toxic positivity levels reaching critical mass.",
        "Outlook: You will buy expensive supplements and forget them.",
        "Outlook: Namaste in bed.",
    ],
    academic: [
        "Outlook: 3AM caffeine overdose likely.",
        "Outlook: C's get degrees (but not jobs).",
        "Outlook: Library fines exceeding tuition.",
    ],
    social: [
        "Outlook: Canceled on Twitter.",
        "Outlook: Left on read by everyone.",
        "Outlook: Viral for the wrong reasons.",
    ]
};

export const generateContent = (category, contextTags, tokens) => {
    // 1. Check Direct Hits
    for (const key of Object.keys(DIRECT_HITS)) {
        // Simple phrase check on tokens to match Direct Hits logic
        if (tokens.includes(key)) {
            const pool = DIRECT_HITS[key];
            // Return early with a format that preserves structure
            return {
                roast: pool[Math.floor(Math.random() * pool.length)],
                forecast: getForecast(category, contextTags), // Still get specific forecast check
                isDirectHit: true
            };
        }
    }


    // 2. Try Dynamic Roast (Smart Templates)
    // 50% chance to use dynamic content if available, to keep variety
    if (Math.random() > 0.3) {
        const dynamic = generateDynamicRoast(tokens.join(' ')); // simple join for now
        if (dynamic) {
            return {
                roast: dynamic,
                forecast: getForecast(category, contextTags),
                isDirectHit: false
            };
        }
    }

    // 3. Select Roast Pool
    let roastPool = ROASTS[category] || ROASTS.optimistic;

    // Add context-specific roasts
    if (contextTags.length > 0) {
        contextTags.forEach(tag => {
            if (ROASTS[tag]) roastPool = [...roastPool, ...ROASTS[tag]];
        });
    }

    // 3. Select Forecast
    const forecast = getForecast(category, contextTags);

    return {
        roast: roastPool[Math.floor(Math.random() * roastPool.length)] || "Try again.",
        forecast: forecast,
        isDirectHit: false
    };
};

const getForecast = (category, contextTags) => {
    let pool = FORECASTS[category] || FORECASTS.optimistic;

    // Prioritize Context Forecasts
    if (contextTags.length > 0) {
        contextTags.forEach(tag => {
            if (FORECASTS[tag]) pool = [...pool, ...FORECASTS[tag]];
        });
    }

    return pool[Math.floor(Math.random() * pool.length)];
};
