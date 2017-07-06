const parser = require('../src/parser')
const { loadFile } = require('../src/utils')

const MOCK_FILE = './tests/issues.json'


test('Total must be 48', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).total()
        const expected = 48

        expect(actual).toBe(expected)

        done() 
    })

})

test('Scored issues must be 44', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).scored()
        const expected = 44

        expect(actual).toBe(expected)

        done() 
    })

})

test('Pontuation must be 4485', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).pontuation()
        const expected = 4485

        expect(actual).toBe(expected)

        done() 
    })

})

test('Total issues \' array objects length  must be 48', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).issues()
        const actual = issues.length
        const expected = 48

        expect(actual).toBe(expected)

        done() 
    })

})

test('Scored issues array objects length must be 44', done => {
    // 3 are customer service and 1 is New Resource, does not count.

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).scoredIssues()
        const actual = issues.length
        const expected = 44

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
            key: 'TEST-814',
            difficulty: 'Não classificado',
            pontuation: 30,
            time: 175,
            type: 'Programação'
        }

        expect(actual).toMatchObject(expected)

        done() 
    })

})

test('Total customer service issues must be 3', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).customerService()
        const expected = 3

        expect(actual).toBe(expected)

        done()
    })

})

test('Total customer service issues time must be 487 minutes', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const actual = parser(dataObj).customerServiceTime()
        const expected = 487

        expect(actual).toBe(expected)

        done()
    })

})

test('Total not classified issues must be 3', done => {
    // Issues with type equals to 'Programação' and 'Teste'
    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.notClassified
        const expected = 3

        expect(actual).toBe(expected)

        done()
    })

})

test('Total very simple issues must be 2', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.verySimple
        const expected = 2

        expect(actual).toBe(expected)

        done()
    })

})

test('Total simple issues must be 29', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.simple
        const expected = 29

        expect(actual).toBe(expected)

        done()
    })

})

test('Total medium issues must be 8', done => {

    loadFile(MOCK_FILE, (err, data) => {
		const dataObj = JSON.parse(data)
        if (err) throw err

        const issues = parser(dataObj).totalIssuesByDifficulty
        const actual = issues.medium
        const expected = 8

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
