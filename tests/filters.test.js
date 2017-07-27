const filters = require('../src/filters')

const issues = [
    {
        key: 'TEST-1',
        type: 'Programação',
        time: 600,
        difficulty: 'Muito simples',
        pontuation: 30
    },
    {
        key: 'TEST-2',
        type: 'Teste',
        time: 300,
        difficulty: 'Muito simples',
        pontuation: 30
    },
    {
        key: 'TEST-3',
        type: 'Tarefa',
        time: 300,
        difficulty: 'Não classificado',
        pontuation: 0
    },
    {
        key: 'TEST-4',
        type: 'Programação',
        time: 360,
        difficulty: 'Simples',
        pontuation: 75
    },
    {
        key: 'TEST-5',
        type: 'Atendimento',
        time: 600,
        difficulty: 'Não classificado',
        pontuation: 0
    },
    {
        key: 'TEST-6',
        type: 'Liberação de Versão',
        time: 0,
        difficulty: 'Muito simples',
        pontuation: 30
    },
    {
        key: 'TEST-7',
        type: 'Liberação de Versão Web',
        time: 0,
        difficulty: 'Simples',
        pontuation: 75
    },
    {
        key: 'TEST-8',
        type: 'Manual / Documentação',
        time: 0,
        difficulty: 'Difícil',
        pontuation: 320
    }

]        

describe('Function: countIssueByType', () => {
    test('Must return 2 issues of "Programação"', () => {
        const expected = 2
  
        const result = filters.countIssuesByType( issues, 'Programação' )
        expect(result).toBe(expected)
    })

    test('Must return 1 issues of "Tarefa"', () => {
        const expected = 1
  
        const result = filters.countIssuesByType( issues, 'Tarefa' )
        expect(result).toBe(expected)
    })

    test('Must return 0 issues of "Erro"', () => {
        const expected = 0
  
        const result = filters.countIssuesByType( issues, 'Erro' )
        expect(result).toBe(expected)
    })

    test('Must return 1 issues of "Liberação de Versão"', () => {
        const expected = 1
  
        const result = filters.countIssuesByType( issues, 'Liberação de Versão' )
        expect(result).toBe(expected)
    })
})

describe('Function: countIssueByDifficulty', () => {
    test('Must return 3 issues "Muito simples"', () => {
        const expected = 3
  
        const result = filters.countIssuesByDifficulty( issues, 'Muito simples' )
        expect(result).toBe(expected)
    })

    test('Must return 2 issues "Simples"', () => {
        const expected = 2
  
        const result = filters.countIssuesByDifficulty( issues, 'Simples' )
        expect(result).toBe(expected)
    })

    test('Must return 0 issues "Média"', () => {
        const expected = 0
  
        const result = filters.countIssuesByDifficulty( issues, 'Média' )
        expect(result).toBe(expected)
    })

    test('Must return 1 issues "Difícil"', () => {
        const expected = 1
  
        const result = filters.countIssuesByDifficulty( issues, 'Difícil' )
        expect(result).toBe(expected)
    })

    test('Must return 0 issues "Muito difícil"', () => {
        const expected = 0
  
        const result = filters.countIssuesByDifficulty( issues, 'Muito difícil' )
        expect(result).toBe(expected)
    })
})

describe('Function: sumPontuation', () => {
    test('Must return 560 points', () => {
        const expected = 560
  
        const result = filters.sumPontuation( issues )
        expect(result).toBe(expected)
    })
})

describe('Function: sumTime', () => {
    // divided by 60, we have 5 minutes
    test('Must return 300 for "Tarefa" issues', () => {
        const expected = 300
  
        const result = filters.sumTime( issues, 'Tarefa' )
        expect(result).toBe(expected)
    })

    test('Must return 600 for "Atendimento" issues', () => {
        const expected = 600
  
        const result = filters.sumTime( issues, 'Atendimento' )
        expect(result).toBe(expected)
    })

    // divided by 60, we have 16 minutes
    test('Must return 960 for "Programação" issues', () => {
        const expected = 960
  
        const result = filters.sumTime( issues, 'Programação' )
        expect(result).toBe(expected)
    })
})

describe('Function: hasScore', () => {
    test('Must return true for "Programação" issues', () => {
        const expected = true
        const firstIssue = issues[0]
        const result = filters.hasScore( firstIssue )
        expect(result).toBe(expected)
    })

    test('Must return true for "Teste" issues', () => {
        const expected = true
        const firstIssue = issues[1]
        const result = filters.hasScore( firstIssue )
        expect(result).toBe(expected)
    })

    test('Must return false for "Tarefa" issues', () => {
        const expected = false
        const firstIssue = issues[2]
        const result = filters.hasScore( firstIssue )
        expect(result).toBe(expected)
    })

    test('Must return false for "Atendimento" issues', () => {
        const expected = false
        const firstIssue = issues[4]
        const result = filters.hasScore( firstIssue )
        expect(result).toBe(expected)
    })
})

describe('Function: scoredIssues', () => {
    test('Must return 6 issues', () => {
        const expected = 6
        const scored = filters.scoredIssues( issues )
        const result = scored.length
        expect(result).toBe(expected)
    })
})

describe('Function: minutesToPoints', () => {
    test('Must return 42 points for 120 minutes, 21/h ', () => {
        const pointsPerHour = 21
        const minutes = 120

        const expected = 42
        const result = filters.minutesToPoints( minutes, pointsPerHour )
        expect(result).toBe(expected)
    })
})

describe('Function: pointsPercentage', () => {
    test('Must return 37.30 percent for 1316 points, with 3528 goal ', () => {
        const goal = 3528
        const points = 1316

        const expected = '37.30'
        const result = filters.pointsPercentage( goal, points )
        expect(result).toBe(expected)
    })
})