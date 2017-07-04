const parser = require('../src/parser')
const { loadFile } = require('../src/utils')

const MOCK_FILE = './tests/test_page.html'

test('Total issues from pagination must be 48', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).pagination()
        const expected = 48
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Total must be 48', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).total()
        const expected = 48
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Scored issues must be 45', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).scored()
        const expected = 45
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Pontuation must be 4515', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).pontuation()
        const expected = 4515
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Total issues \' array objects length  must be 48', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).issues()
        const actual = issues.length
        const expected = 48
   
        expect(actual).toBe(expected);

        done() 
    })

})

test('Scored issues \' array objects length  must be 45', done => {
    
    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err
        
        const issues = parser(data).scoredIssues()
        const actual = issues.length
        const expected = 45
   
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

test('Total customer service must be 3', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).customerService()
        const expected = 3

        expect(actual).toBe(expected);

        done()
    })

})

test('Total customer service time must be 487', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).customerServiceTime()
        const expected = 487

        expect(actual).toBe(expected);

        done()
    })

})

test('Total not classified service must be 4', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).notClassifiedIssues()
        const expected = 4

        expect(actual).toBe(expected);

        done()
    })

})

test('Total very simple service must be 2', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).verySimpleIssues()
        const expected = 2

        expect(actual).toBe(expected);

        done()
    })

})

test('Total simple service must be 29', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).simpleIssues()
        const expected = 29

        expect(actual).toBe(expected);

        done()
    })

})

test('Total medium service must be 8', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).mediumIssues()
        const expected = 8

        expect(actual).toBe(expected);

        done()
    })

})

test('Total hard service must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).hardIssues()
        const expected = 1

        expect(actual).toBe(expected);

        done()
    })

})

test('Total very hard service must be 1', done => {

    loadFile(MOCK_FILE, (err, data) => {
        if (err) throw err

        const actual = parser(data).veryHardIssues()
        const expected = 1

        expect(actual).toBe(expected);

        done()
    })

})
