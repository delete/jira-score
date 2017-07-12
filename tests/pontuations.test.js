const pontuations = require('../src/pontuations')


describe('Issue: Very simple', () => {
    test('"Muito simples" must have "VS" as slug', () => {
        const payload = 'Muito simples'
        const expected = 'VS'
        
        const result = pontuations(payload).slug
        expect(result).toBe(expected)
    });

    test('"Muito simples" must return 30', () => {
        const payload = 'Muito simples'
        const expected = 30
        
        const result = pontuations(payload).points
        expect(result).toBe(expected)
    });
})


describe('Issue: Simple', () => {
    test('"Simples" must have "S" as slug', () => {
        const payload = 'Simples'
        const expected = 'S'
        
        const result = pontuations(payload).slug
        expect(result).toBe(expected)
    })

     test('"Simples" must return 75', () => {
        const payload = 'Simples'
        const expected = 75
        
        const result = pontuations(payload).points
        expect(result).toBe(expected)
    })
})

describe('Issue: Média', () => {
    test('"Média" must have "M" as slug', () => {
        const payload = 'Média'
        const expected = 'M' 
        
        const result = pontuations(payload).slug
        expect(result).toBe(expected)
    })

    test('"Média" must return 160', () => {
        const payload = 'Média'
        const expected = 160
        
        const result = pontuations(payload).points
        expect(result).toBe(expected)
    })
})

describe('Issue: Difícil', () => {
    test('"Difícil" must have "D" as slug', () => {
        const payload = 'Difícil'
        const expected = 'H' 
        
        const result = pontuations(payload).slug
        expect(result).toBe(expected)
    })

    test('"Difícil" must return 320', () => {
        const payload = 'Difícil'
        const expected = 320
        
        const result = pontuations(payload).points
        expect(result).toBe(expected)
    })
})

describe('Issue: Muito Difícil', () => {
    test('"Muito Difícil" must have "D" as slug', () => {
        const payload = 'Muito difícil'
        const expected = 'VH' 
        
        const result = pontuations(payload).slug
        expect(result).toBe(expected)
    })

    test('"Muito difícil" must return 560', () => {
        const payload = 'Muito difícil'
        const expected = 560
        
        const result = pontuations(payload).points
        expect(result).toBe(expected)
    })
})

describe('Issue: Não classificado', () => {
    test('"Não classificado" must have "NC" as slug', () => {
        let payload = 'Não classificado'
        const expected = 'NC' 
        
        let result = pontuations(payload).slug
        expect(result).toBe(expected)

        payload = 'Não Classificado'
        result = pontuations(payload).slug
        expect(result).toBe(expected)
    })

    test('"Não classificado" must return 30', () => {
        let payload = 'Não classificado'
        const expected = 30
        
        let result = pontuations(payload).points
        expect(result).toBe(expected)

        payload = 'Não Classificado'
        result = pontuations(payload).points
        expect(result).toBe(expected)
    })
})

test('"Anything" must return as "Não classificado"', () => {
    const payload = 'Anything'
    const expectedPoints = 30
    const expectedSlug = 'NC'
    
    const actualPoints = pontuations(payload).points
    expect(actualPoints).toBe(expectedPoints)

    const actualSlug = pontuations(payload).slug
    expect(actualSlug).toBe(expectedSlug)
    
})

