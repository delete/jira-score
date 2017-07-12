const parser = require('../src/parser')
const { loadFile } = require('../src/utils')
const { 
    countIssuesByType,
    countIssuesByDifficulty,
    sumPontuation,
    sumTime,
    hasScore,
    scoredIssues
} = require('../src/filters')

const MOCK_FILE = './tests/issues.json'


test('Total must be 11', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)
        
        const actual = issues.length
        const expected = 11

        expect(actual).toBe(expected)

        done()
    })

})

test('Scored issues must be 9', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)
        const scored = scoredIssues( issues )
        
        const actual = scored.length
        const expected = 9

        expect(actual).toBe(expected)

        done()
    })

})

test('Pontuation must be 1265', done => {
    // Não Classificada 30
    // 4 Muito simples (4x30)
    // 1 Simples 75
    // 1 Média 160
    // 1 Difícil 320
    // 1 Muito difícil 560
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)
        
        const actual = sumPontuation( issues )
        const expected = 1265

        expect(actual).toBe(expected)

        done()
    })

})

test('Issues must have all fields right', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = issues[6]
        const expected = {
            key: 'TEST-113',
            difficulty: 'Não Classificado',
            pontuation: 0,
            time: 60,
            type: 'Atendimento'
        }

        expect(actual).toMatchObject(expected)

        done()
    })

})

test('Total customer service issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)
        
        const actual = countIssuesByType( issues, 'Atendimento')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total customer service issues time must be 60 minutes', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = sumTime( issues, 'Atendimento' )
        const expected = 60

        expect(actual).toBe(expected)

        done()
    })

})

test('Total tasks issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)
        
        const actual = countIssuesByType( issues, 'Tarefa')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total tasks issues time must be 120 minutes', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = sumTime( issues, 'Tarefa' )
        const expected = 120

        expect(actual).toBe(expected)

        done()
    })

})

test('Total not classified issues must be 1', done => {
    // Issues with type equals to 'Programação' and 'Teste'
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = countIssuesByDifficulty( issues, 'Não Classificado')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total very simple issues must be 4', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = countIssuesByDifficulty( issues, 'Muito simples')
        const expected = 4

        expect(actual).toBe(expected)

        done()
    })

})

test('Total simple issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = countIssuesByDifficulty( issues, 'Simples')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total medium issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = countIssuesByDifficulty( issues, 'Média')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total hard issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = countIssuesByDifficulty( issues, 'Difícil')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total very hard issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = countIssuesByDifficulty( issues, 'Muito difícil')
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})
