export const ENGINE_CONFIG = {
    BASE_SCORE: 50,
    MIN_SCORE: 5,
    MAX_SCORE: 100,
    THRESHOLDS: {
        DELUSIONAL: 35,
        ACHIEVABLE: 80
    },
    WEIGHTS: {
        DELUSIONAL: {
            'billionaire': -60, 'millionaire': -40, 'trillionaire': -80, 'never': -30,
            'always': -30, 'quit job': -50, 'perfect': -40, 'ceo': -40, 'astronaut': -60,
            'marry': -40, 'famous': -50, 'hollywood': -60, 'president': -80, 'mars': -70,
            'lottery': -90, 'passive income': -40, 'crypto': -30, '100%': -20,
            'quit sugar': -40, 'no sugar': -40, 'six pack': -30, 'abs': -20
        },
        REALISTIC: {
            'water': 25, 'walk': 20, 'sleep': 25, 'friend': 15, 'eat': 10, 'vegetable': 20,
            'fruit': 20, 'try': 15, 'maybe': 10, 'once': 10, 'book': 15, 'class': 15,
            'call': 20, 'mom': 25, 'dad': 25, 'text': 15, 'clean': 20, 'drink': 10,
            'study': 15, 'save': 15, 'invest': 10, 'floss': 30
        },
        OPTIMISTIC: {
            'gym': 5, 'run': 5, 'code': 5, 'learn': 10, 'read': 10, 'job': 10,
            'promotion': 5, 'language': 5, 'meditate': 10, 'diet': 0
        }
    },
    MULTIPLIERS: {
        'daily': 0.85, 'every': 0.85, 'day': 0.9, 'always': 0.5, 'never': 0.5,
        'completely': 0.6, 'forever': 0.4, 'strictly': 0.7, 'perfectly': 0.5,
        '100%': 0.6
    },
    NEGATION_WORDS: ['not', 'no', 'never', 'stop', 'quit', 'avoid', 'cease', "won't", "don't", "can't"],
    CONTRACTIONS: {
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
        "didn't": "did not",
        "im": "i am",
        "i'm": "i am"
    }
};
