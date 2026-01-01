import nlp from 'compromise';

const TEMPLATES = {
    // Templates that use both a Verb and a Noun
    verbNoun: [
        "You say you want to {{verb}} {{noun}}, but we all know {{noun}} is the only thing holding your life together.",
        "Plan: {{verb}} {{noun}}. Reality: {{verb}} Netflix.",
        "I analyzed your desire to {{verb}} {{noun}}. My conclusion: 😂.",
        "You can't even {{verb}} a decent meal, let alone {{noun}}.",
        "{{verb}} {{noun}}? In this economy? Good luck.",
    ],
    // Templates that just use a Noun
    nounOnly: [
        "{{noun}} won't fill the void in your soul.",
        "Is {{noun}} a tax write-off? asking for a friend.",
        "Stop making {{noun}} your entire personality.",
        "I've seen goldfish with more commitment to {{noun}} than you.",
    ],
    // Templates that just use a Verb
    verbOnly: [
        "You want to {{verb}}? Try waking up before noon first.",
        "I'd love to see you try to {{verb}}. It would be a comedy special.",
        "Please, for the love of humanity, do not {{verb}}.",
    ]
};

/**
 * Generates a dynamic roast based on the user's input using NLP.
 * @param {string} input - User's resolution text.
 * @returns {string|null} - A dynamic roast or null if no patterns matched.
 */
export const generateDynamicRoast = (input) => {
    const doc = nlp(input);

    // Extract useful info
    // We stick to simple text extraction for stability
    const verbs = doc.verbs().out('array');
    const nouns = doc.nouns().out('array');

    // Filter out common weak words if needed, but compromise is usually okay.
    const mainVerb = verbs.length > 0 ? verbs[0] : null;
    const mainNoun = nouns.length > 0 ? nouns[nouns.length - 1] : null; // Last noun usually subject? "quit sugar" -> sugar.

    // 1. Try Verb + Noun templates (Best quality)
    if (mainVerb && mainNoun) {
        const template = getRandom(TEMPLATES.verbNoun);
        return fillTemplate(template, { verb: mainVerb, noun: mainNoun });
    }

    // 2. Try Noun Only
    if (mainNoun) {
        const template = getRandom(TEMPLATES.nounOnly);
        return fillTemplate(template, { noun: mainNoun });
    }

    // 3. Try Verb Only
    if (mainVerb) {
        const template = getRandom(TEMPLATES.verbOnly);
        return fillTemplate(template, { verb: mainVerb });
    }

    return null;
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fillTemplate = (template, data) => {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
        // Simple replace all occurrences
        result = result.replaceAll(`{{${key}}}`, value);
    }
    return result;
}
