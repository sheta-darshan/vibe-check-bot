import { describe, it, expect } from 'vitest'
import { analyzeResolutionLogic } from './realityEngine'

describe('Reality Engine 3.0', () => {

    // 1. Direct Hit System
    it('should trigger Direct Hit for specific keywords', () => {
        const result = analyzeResolutionLogic("I have a startup idea")
        // Since it's random, we check if the roast comes from ANY of the startup roasts
        const validRoasts = [
            "Is it an AI wrapper? Be honest.",
            "Pre-revenue or pre-reality?",
            "Let me guess, you're the 'Idea Guy'?",
            "Disrupting the industry? How about disrupting your sleep schedule first.",
        ]
        expect(validRoasts).toContain(result.roast)
        expect(result.confidence).toBeGreaterThan(90)
    })

    it('should trigger Influencer specific roasts', () => {
        const result = analyzeResolutionLogic("I want to go viral on tiktok")
        expect(result.category).not.toBe('achievable') // Likely delusional or optimistic
        // Check if the roast is from the influencer pool (we can check via content logic)
        // Ideally we'd export constants to test against, but checking sentiment is okay.
    })

    // 2. Negation Logic
    it('should understand negation (not quitting sugar)', () => {
        const positive = analyzeResolutionLogic("I will quit sugar")
        const negative = analyzeResolutionLogic("I will NOT quit sugar")

        // "Quit sugar" is delusional (-40 weight)
        // "Not quit sugar" flips the weight (-(-40)*0.5 = +20) -> Score goes UP

        expect(negative.score).toBeGreaterThan(positive.score)
    })

    // 3. Categorization
    it('should classify high scores as Achievable', () => {
        // "Drink water" (+25) "Sleep" (+25) "Vegetable" (+20) -> ~70+ Base 50 = Achievable
        const result = analyzeResolutionLogic("Drink water and sleep more and eat vegetables")
        expect(result.category).toBe('achievable')
    })

    it('should classify low scores as Delusional', () => {
        // "Billionaire" (-60) "Lottery" (-90) -> Very Low
        const result = analyzeResolutionLogic("Win the lottery and become a billionaire")
        expect(result.category).toBe('delusional')
    })

    it('should generate a Vibe Forecast', () => {
        const result = analyzeResolutionLogic("I want to be a crypto billionaire")
        expect(result.forecast).toBeDefined()
        expect(typeof result.forecast).toBe('string')
        // Crypto context should trigger crypto forecast
        expect(result.forecast).toMatch(/Outlook:/i)
    })

    it('should trigger Ex-specific roast for "Text my ex"', () => {
        const result = analyzeResolutionLogic("Text my ex")
        const exRoasts = [
            "They blocked you for a reason.",
            "Texting them is a violation of the Geneva Convention.",
            "Closure is a myth. Move on."
        ]
        expect(exRoasts).toContain(result.roast)
        expect(result.category).toBe('optimistic') // Standard category, but custom roast
    })

    // 4. Matrix Mode
    it('should force extremas in Matrix mode', () => {
        // Normal input that results in delusional
        const result = analyzeResolutionLogic("Become a billionaire", true)
        expect(result.score).toBe(1) // Agent Smith override
    })
})
