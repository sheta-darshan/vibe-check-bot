import nlp from 'compromise';

const TEMPLATES = {
    // Generic Fallbacks
    generic: {
        verbNoun: [
            "You say you want to {{verb}} {{noun}}, but we all know {{noun}} is the only thing holding your life together.",
            "Plan: {{verb}} {{noun}}. Reality: {{verb}} Netflix.",
            "I analyzed your desire to {{verb}} {{noun}}. My conclusion: 😂.",
            "You can't even {{verb}} a decent meal, let alone {{noun}}.",
            "If {{verb}}ing {{noun}} was an Olympic sport, you’d still find a way to get disqualified.",
            "I’ve seen better decision-making skills in a horror movie character.",
            "You want to {{verb}} {{noun}}? That’s cute. Did your mom give you permission?"
        ],
        nounOnly: [
            "{{noun}} won't fill the void in your soul.",
            "Is {{noun}} a tax write-off? Asking for a friend.",
            "Stop making {{noun}} your entire personality.",
            "The year is 2026, and you’re still talking about {{noun}}? Groundbreaking.",
            "{{noun}} is the ‘Live, Laugh, Love’ of your generation.",
            "I ran a simulation where you got {{noun}}. You still weren't happy."
        ],
        verbOnly: [
            "You want to {{verb}}? Try waking up before noon first.",
            "I'd love to see you try to {{verb}}. It would be a comedy special.",
            "You say {{verb}}, I say 'delusional'. Let's call the whole thing off.",
            "Are you going to {{verb}}, or just post a TikTok about it?"
        ],
        adjectiveNoun: [
            "You think {{noun}} is {{adjective}}? You're {{adjective}}.",
            "A {{adjective}} {{noun}} won't save you.",
            "Nothing says 'delusional' like a {{adjective}} {{noun}}.",
            "Your vibe is currently: {{adjective}} {{noun}}. And that's not a compliment."
        ]
    },
    // Context Specific
    finance: {
        verbNoun: [
            "You want to {{verb}} {{noun}}? With what money?",
            "Your bank account called. It said 'Please don't {{verb}} {{noun}}'.",
            "Financial Tip: {{verb}}ing {{noun}} is a fast track to poverty.",
            "You want to {{verb}} {{noun}} but your credit score is the same as your body temperature.",
            "Maybe {{verb}} your spending habits before you try to {{verb}} {{noun}}."
        ],
        nounOnly: [
            "{{noun}} is a liability, just like your spending habits.",
            "Investing in {{noun}}? Just burn your money instead.",
            "Your portfolio is 90% {{noun}} and 10% prayers.",
            "You treat {{noun}} like an asset, but it’s definitely a personality debt."
        ]
    },
    career: {
        verbNoun: [
            "Adding '{{verb}} {{noun}}' to your LinkedIn won't get you hired.",
            "You want to {{verb}} {{noun}}? Your boss is already laughing.",
            "You’ll {{verb}} {{noun}} at work, but only if 'work' means the 10 minutes before you log off.",
            "Passive-aggressively {{verb}}ing {{noun}} is not a job description."
        ],
        nounOnly: [
            "{{noun}} is not a career path, it's a cry for help.",
            "I’ve seen more ambition in a loaf of sourdough than in your plan for {{noun}}.",
            "The only thing you’re promoted to is 'Most Likely to be Replaced by an API'."
        ]
    },
    diet: {
        verbNoun: [
            "You'll {{verb}} {{noun}} for one week, then inhale a pizza.",
            "{{verb}}ing {{noun}} won't fix your relationship with food.",
            "You want to {{verb}} {{noun}}? Your air fryer is skeptical.",
            "I give your plan to {{verb}} {{noun}} about 48 hours before you’re back to 3 AM tacos."
        ],
        nounOnly: [
            "{{noun}} tastes like sadness.",
            "Is {{noun}} gluten-free? Because your logic definitely isn't.",
            "You’re one {{noun}} away from a complete lifestyle breakdown."
        ]
    },
    love: {
        verbNoun: [
            "You can {{verb}} {{noun}}, but you can't text back?",
            "Does your therapist know you want to {{verb}} {{noun}}?",
            "You want to {{verb}} {{noun}}? Focus on {{verb}}ing a shower first.",
            "Maybe if you {{verb}} {{noun}} as much as you stalk your ex, you'd be happy."
        ],
        nounOnly: [
            "{{noun}} is a red flag. Actually, it's a whole parade of them.",
            "Your soulmate is out there, but they’re definitely avoiding {{noun}}.",
            "You: {{noun}}. Your date: 🏃💨."
        ]
    },
    // New Category: Tech / AI (Perfect for your vibe auditor)
    tech: {
        verbNoun: [
            "You want to {{verb}} {{noun}}? There’s an NPM package for that, and it’s better than you.",
            "I checked your code. You should {{verb}} {{noun}} and then {{verb}} your career choice.",
            "Your logic for {{verb}} {{noun}} has more bugs than a Cyberpunk launch."
        ],
        nounOnly: [
            "{{noun}} is deprecated. Just like your social life.",
            "I’ve seen AI-generated art with more soul than your interest in {{noun}}.",
            "Error 404: Interest in {{noun}} not found."
        ]
    }
};

/**
 * Generates a dynamic roast based on the user's input using NLP.
 * @param {string} input - User's resolution text.
 * @param {string} category - The determined category (e.g., finance, career).
 * @returns {string|null} - A dynamic roast or null if no patterns matched.
 */
export const generateDynamicRoast = (input, category = 'generic') => {
    const doc = nlp(input);

    // Extract useful info
    const verbs = doc.verbs().out('array');
    const nouns = doc.nouns().out('array');
    const adjectives = doc.adjectives().out('array');

    const mainVerb = verbs.length > 0 ? verbs[0] : null;
    const mainNoun = nouns.length > 0 ? nouns[nouns.length - 1] : null;
    const mainAdjective = adjectives.length > 0 ? adjectives[0] : null;

    // Helper to get templates for a category, falling back to generic
    const getTemplates = (type) => {
        const catTemplates = TEMPLATES[category]?.[type] || [];
        const genTemplates = TEMPLATES.generic[type] || [];
        return [...catTemplates, ...genTemplates];
    };

    // 1. Try Adjective + Noun (New flavor)
    if (mainAdjective && mainNoun && Math.random() > 0.6) {
        const templates = getTemplates('adjectiveNoun');
        if (templates.length > 0) {
            return fillTemplate(getRandom(templates), { adjective: mainAdjective, noun: mainNoun });
        }
    }

    // 2. Try Verb + Noun templates (Best quality)
    if (mainVerb && mainNoun) {
        const templates = getTemplates('verbNoun');
        return fillTemplate(getRandom(templates), { verb: mainVerb, noun: mainNoun });
    }

    // 3. Try Noun Only
    if (mainNoun) {
        const templates = getTemplates('nounOnly');
        return fillTemplate(getRandom(templates), { noun: mainNoun });
    }

    // 4. Try Verb Only
    if (mainVerb) {
        const templates = getTemplates('verbOnly');
        return fillTemplate(getRandom(templates), { verb: mainVerb });
    }

    return null;
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fillTemplate = (template, data) => {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
        result = result.replaceAll(`{{${key}}}`, value);
    }
    return result;
}
