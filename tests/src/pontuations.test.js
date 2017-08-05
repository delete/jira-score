const { getDifficulty, isClassified } = require('../../src/pontuations')

describe('Function: getDifficulty', () => {
    describe('Issue: Very simple', () => {
        test('"Muito simples" must have "VS" as slug', () => {
            const payload = 'Muito simples'
            const expected = 'VS'
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        });

        test('"Muito simples" must return 30', () => {
            const payload = 'Muito simples'
            const expected = 30
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected)
        });
    })


    describe('Issue: Simple', () => {
        test('"Simples" must have "S" as slug', () => {
            const payload = 'Simples'
            const expected = 'S'
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        })

         test('"Simples" must return 75', () => {
            const payload = 'Simples'
            const expected = 75
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected)
        })
    })

    describe('Issue: Média', () => {
        test('"Média" must have "M" as slug', () => {
            const payload = 'Média'
            const expected = 'M' 
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        })

        test('"Média" must return 160', () => {
            const payload = 'Média'
            const expected = 160
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected)
        })
    })

    describe('Issue: Difícil', () => {
        test('"Difícil" must have "D" as slug', () => {
            const payload = 'Difícil'
            const expected = 'H' 
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        })

        test('"Difícil" must return 320', () => {
            const payload = 'Difícil'
            const expected = 320
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected)
        })
    })

    describe('Issue: Muito Difícil', () => {
        test('"Muito Difícil" must have "D" as slug', () => {
            const payload = 'Muito difícil'
            const expected = 'VH' 
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        })

        test('"Muito difícil" must return 560', () => {
            const payload = 'Muito difícil'
            const expected = 560
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected)
        })
    })

    describe('Issue: Não classificado', () => {
        test('"Não classificado" must have "NC" as slug', () => {
            const payload = 'Não classificado'
            const expected = 'NC' 
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        })

        test('"Não classificado" must return 30', () => {
            const payload = 'Não classificado'
            const expected = 30
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected) 
        })
    })

    describe('Issue: Sem Pontuação', () => {
        test('"Sem Pontuação" must have "NP" as slug', () => {
            const payload = 'Sem Pontuação'
            const expected = 'NP' 
            
            const result = getDifficulty(payload).slug
            expect(result).toBe(expected)
        })

        test('"Sem Pontuação" must return 0', () => {
            const payload = 'Sem Pontuação'
            const expected = 0
            
            const result = getDifficulty(payload).points
            expect(result).toBe(expected) 
        })
    })

    test('"Anything" must return as "Não classificado"', () => {
        const payload = 'Anything'
        const expectedPoints = 30
        const expectedSlug = 'NC'
        
        const actualPoints = getDifficulty(payload).points
        expect(actualPoints).toBe(expectedPoints)

        const actualSlug = getDifficulty(payload).slug
        expect(actualSlug).toBe(expectedSlug)
        
    })
})

describe('Function: isClassified', () => {
    test('Must return true for "Programação" issues', () => {
        const payload = 'Programação'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return true for "Teste" issues', () => {
        const payload = 'Teste'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return true for "Manual / Documentação" issues', () => {
        const payload = 'Manual / Documentação'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return true for "Liberação de Versão Web" issues', () => {
        const payload = 'Liberação de Versão Web'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return true for "Liberação de Versão" issues', () => {
        const payload = 'Liberação de Versão'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return true for "Tarefa" issues', () => {
        const payload = 'Tarefa'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return false for "Melhoria" issues', () => {
        const payload = 'Melhoria'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })

    test('Must return false for "Erro" issues', () => {
        const payload = 'Erro'
        const expected = true
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })
    
    test('Must return false for "Atendimento" issues', () => {
        const payload = 'Atendimento'
        const expected = false
        const result = isClassified( payload )
        expect(result).toBe(expected)
    })
})