const parser = require('../../src/parser')
const { loadFile } = require('../../src/utils')

const MOCK_FILE = './tests/fixtures/issues.json'


test('Total of issues before parser method must be 11', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const dataObj = JSON.parse(data)
        const issues = dataObj.issues
        
        const actual = issues.length
        const expected = 11

        expect(actual).toBe(expected)

        done()
    })
})

test('Total of issues after paser method must be 11', done => {

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

test('The chosen issue must have all the right fields before parser method', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const dataObj = JSON.parse(data)
        const issues = dataObj.issues

        const actual = issues[6]
        const expected = {
            key: 'TEST-113',
            customfield_17132: {
                value: '0 - Não classificado'
            },
            timespent: 3600,
            customfield_21711: 'Atendimento'
        }

        expect(actual.key).toBe(expected.key)
        expect(actual.fields.customfield_17132.value).toBe(expected.customfield_17132.value)
        expect(actual.fields.timespent).toBe(expected.timespent)
        expect(actual.fields.customfield_21711).toBe(expected.customfield_21711)

        done()
    })
})


test('The chosen issue must have all the right fields after parser method', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const dataObj = JSON.parse(data)
        const issues = parser(dataObj)

        const actual = issues[6]
        const expected = {
            key: 'TEST-113',
            difficulty: 'Não classificado',
            pontuation: 0,
            time: 60,
            type: 'Atendimento'
        }

        expect(actual).toMatchObject(expected)

        done()
    })
})