const parser = require('../src/parser')
const { loadFile } = require('../src/utils')

const MOCK_FILE = './tests/test_page.html'

test('Total must be 40', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).total()
        const expected = 46
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Scored issues must be 35', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).scored()
        const expected = 43
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Pontuation must be 1140', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).pontuation()
        const expected = 3635
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Total issues \' array objects length  must be 40', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).issues()
        const actual = issues.length
        const expected = 46
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Scored issues \' array objects length  must be 35', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).scoredIssues()
        const actual = issues.length
        const expected = 43
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Issues must have all fields right', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).issues()
        const actual = issues[6]
        const expected = {
            key: 'TEST-814',
            difficulty: 'Não classificado',
            pontuation: 30,
            time: 175,
            type: 'Programação'
        }
   
        expect(actual).toMatchObject(expected);

        done() 
    })

})

test('First issues customer servicemust all fields right', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const issues = parser(data).issues()
        const actual = issues[0]
        const expected = {
            key: 'TEST-822',
            difficulty: 'Não classificado',
            pontuation: 0,
            time: 208,
            type: 'Atendimento'
        }

        expect(actual).toMatchObject(expected);

        done()
    })

})