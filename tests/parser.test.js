const parser = require('../src/parser')
const { loadFile } = require('../src/utils')

const MOCK_FILE = './tests/test_page.html'

test('Total must be 40', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).total()
        const expected = 40
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Scored issues must be 35', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).scored()
        const expected = 35
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Pontuation must be 1140', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).pontuation()
        const expected = 1140
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Total issues \' array objects length  must be 40', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).issues()
        const actual = issues.length
        const expected = 40
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Scored issues \' array objects length  must be 35', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).scoredIssues()
        const actual = issues.length
        const expected = 35
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('First issues must have all fields right', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).issues()
        const actual = issues[0]
        const expected = {
            key: 'ASK-99',
            difficulty: 'Não classificado',
            pontuation: 30
        }
   
        expect(actual).toMatchObject(expected);

        done() 
    })

})
