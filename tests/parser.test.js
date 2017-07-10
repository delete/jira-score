const parser = require('../src/parser')
const { loadFile } = require('../src/utils')

const MOCK_FILE = './tests/issues.json'


test('Total must be 10', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).total()
        const expected = 10

        expect(actual).toBe(expected)

        done()
    })

})

test('Scored issues must be 9', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).scored()
        const expected = 9

        expect(actual).toBe(expected)

        done()
    })

})

test('Pontuation must be 1235', done => {
    // Não Classificada 30
    // 4 Muito simples (4x30)
    // 1 Simples 75
    // 1 Média 160
    // 1 Difícil 320
    // 1 Muito difícil 560
    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).pontuation()
        const expected = 1265

        expect(actual).toBe(expected)

        done()
    })

})

test('Total issues \' array objects length  must be 10', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).issues()
        const actual = issues.length
        const expected = 10

        expect(actual).toBe(expected)

        done()
    })

})

test('Scored issues array objects length must be 9', done => {
    // 1 is customer service

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).scoredIssues()
        const actual = issues.length
        const expected = 9

        expect(actual).toBe(expected)

        done()
    })

})

test('Issues must have all fields right', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).issues()
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
        const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).customerService()
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total customer service issues time must be 60 minutes', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).customerServiceTime()
        const expected = 60

        expect(actual).toBe(expected)

        done()
    })

})

test('Total not classified issues must be 1', done => {
    // Issues with type equals to 'Programação' and 'Teste'
    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.notClassified
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total very simple issues must be 4', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.verySimple
        const expected = 4

        expect(actual).toBe(expected)

        done()
    })

})

test('Total simple issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.simple
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total medium issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.medium
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total hard issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.hard
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})

test('Total very hard issues must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.veryHard
        const expected = 1

        expect(actual).toBe(expected)

        done()
    })

})
