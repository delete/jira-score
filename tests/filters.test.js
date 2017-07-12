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
        difficulty: '',
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
        difficulty: '',
        pontuation: 0
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
})

describe('Function: countIssueByDifficulty', () => {
    test('Must return 2 issues "Muito simples"', () => {
        const expected = 2
  
        const result = filters.countIssuesByDifficulty( issues, 'Muito simples' )
        expect(result).toBe(expected)
    })

    test('Must return 1 issues "Simples"', () => {
        const expected = 1
  
        const result = filters.countIssuesByDifficulty( issues, 'Simples' )
        expect(result).toBe(expected)
    })

    test('Must return 0 issues "Hard"', () => {
        const expected = 0
  
        const result = filters.countIssuesByDifficulty( issues, 'Hard' )
        expect(result).toBe(expected)
    })
})

describe('Function: sumPontuation', () => {
    test('Must return 135 points', () => {
        const expected = 135
  
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

describe('Function: canClassify', () => {
    test('Must return true for "Programação" issues', () => {
        const expected = true
        const firstIssue = issues[0]
        const result = filters.canClassify( firstIssue.type )
        expect(result).toBe(expected)
    })

    test('Must return true for "Teste" issues', () => {
        const expected = true
        const firstIssue = issues[1]
        const result = filters.canClassify( firstIssue.type )
        expect(result).toBe(expected)
    })

    test('Must return false for "Tarefa" issues', () => {
        const expected = false
        const firstIssue = issues[2]
        const result = filters.canClassify( firstIssue.type )
        expect(result).toBe(expected)
    })

    test('Must return false for "Atendimento" issues', () => {
        const expected = false
        const firstIssue = issues[4]
        const result = filters.canClassify( firstIssue.type )
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
    test('Must return 3 issues', () => {
        const expected = 3
        const scored = filters.scoredIssues( issues )
        const result = scored.length
        expect(result).toBe(expected)
    })
})