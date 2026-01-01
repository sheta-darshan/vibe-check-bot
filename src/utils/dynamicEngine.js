import nlp from 'compromise';

const TEMPLATES = {
    // Generic Fallbacks
    generic: {
        verbNoun: [
            "You say you want to {{verb}} {{noun}}, but we all know {{noun}} is the only thing holding your life together.",
            "Plan: {{verb}} {{noun}}. Reality: {{verb}} Netflix.",
            "I analyzed your desire to {{verb}} {{noun}}. My conclusion: 😂.",
            "You can't even {{verb}} a decent meal, let alone {{noun}}.",
        ],
        nounOnly: [
            "{{noun}} won't fill the void in your soul.",
            "Is {{noun}} a tax write-off? Asking for a friend.",
            "Stop making {{noun}} your entire personality.",
        ],
        verbOnly: [
            "You want to {{verb}}? Try waking up before noon first.",
            "I'd love to see you try to {{verb}}. It would be a comedy special.",
        ],
        adjectiveNoun: [
            "You think {{noun}} is {{adjective}}? You're {{adjective}}.",
            "A {{adjective}} {{noun}} won't save you.",
            "Nothing says 'delusional' like a {{adjective}} {{noun}}.",
        ]
    },
    // Context Specific
    finance: {
        verbNoun: [
            "You want to {{verb}} {{noun}}? With what money?",
            "Your bank account called. It said 'Please don't {{verb}} {{noun}}'.",
            "Financial Tip: {{verb}}ing {{noun}} is a fast track to poverty.",
        ],
        nounOnly: [
            "{{noun}} is a liability, just like your spending habits.",
            "Investing in {{noun}}? Just burn your money instead.",
        ]
    },
    career: {
        verbNoun: [
            "Adding '{{verb}} {{noun}}' to your LinkedIn won't get you hired.",
            "You want to {{verb}} {{noun}}? Your boss is already laughing.",
        ],
        nounOnly: [
            "{{noun}} is not a career path, it's a cry for help.",
        ]
    },
    diet: {
        verbNoun: [
            "You'll {{verb}} {{noun}} for one week, then inhale a pizza.",
            "{{verb}}ing {{noun}} won't fix your relationship with food.",
        ],
        nounOnly: [
            "{{noun}} tastes like sadness.",
        ]
    },
    love: {
        verbNoun: [
            "You can {{verb}} {{noun}}, but you can't text back?",
            "Does your therapist know you want to {{verb}} {{noun}}?",
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
