const utils = require('../src/utils')

describe('Function: toBase64', () => {
    test('base4 of admin:pass must be YWRtaW46cGFzcw==', () => {
        const actual = 'admin:pass'
        const expected = 'YWRtaW46cGFzcw=='
        
        const result = utils.toBase64(actual)
        expect(result).toBe(expected)
    })
})

describe('Function: splitStringAndReturnLast', () => {
    test('Must return te string after te "-" char', () => {
        const actual = '0 - Não Classificado'
        const expected = 'Não Classificado'
        
        const result = utils.splitStringAndReturnLast(actual)
        expect(result).toBe(expected)
    })

    test('Must return empty if a empty string is given', () => {
        const actual = ''
        const expected = ''
        
        const result = utils.splitStringAndReturnLast(actual)
        expect(result).toBe(expected)
    })
})

describe('Function: getWorkingDays', () => {
    test('Must return 12 days to July 2017', () => {
        const july = 7 - 1 // must substract 1
        const firstDay = 1
        const lastDay = 31
        const year = 2017
        
        const begin = new Date(year, july, firstDay)
        const end = new Date(year, july, lastDay)

        const expected = 21
        
        const result = utils.getWorkingDays( begin, end )
        expect(result).toBe(expected)
    })
})