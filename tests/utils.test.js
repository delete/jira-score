const utils = require('../src/utils')

describe('Function: Base64', () => {
    test('base4 of admin:pass must be YWRtaW46cGFzcw==', () => {
        const actual = 'admin:pass'
        const expected = 'YWRtaW46cGFzcw=='
        
        const result = utils.toBase64(actual)
        expect(result).toBe(expected)
    })
})

describe('Function: timeStringToMinutes', () => {
    test('Empty string must return 0 minutes', () => {
        const payload = ''
        const expected = 0

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('1 minute must return 1 minute', () => {
        const payload = '1 minute'
        const expected = 1

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('30 minutes must return 30 minutes', () => {
        const payload = '30 minutes'
        const expected = 30

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('1 hour must return 60 minutes', () => {
        const payload = '1 hour'
        const expected = 60

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('2 hour must return 120 minutes', () => {
        const payload = '2 hours'
        const expected = 120

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('2 hours, 35 minutes must return 155 minutes', () => {
        const payload = '2 hours, 35 minutes'
        const expected = 155

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('1 day must return 480 minutes', () => {
        const payload = '1 day'
        const expected = 480

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('2 days, 1 hour must return 1020 minutes', () => {
        const payload = '2 days, 1 hour'
        const expected = 1020

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('2 days, 1 hour, 30 minutes must return 1050 minutes', () => {
        const payload = '2 days, 1 hour, 30 minutes'
        const expected = 1050

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('2 days, 30 minutes must return 990 minutes', () => {
        const payload = '2 days, 30 minutes'
        const expected = 990

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('1 week must return 2400 minutes', () => {
        const payload = '1 week'
        const expected = 2400

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

    test('1 week, 2 days, 1 hour, 30 minutes must return 3450 minutes', () => {
        const payload = '1 week, 2 days, 1 hour, 30 minutes'
        const expected = 3450

        const result = utils.timeStringToMinutes(payload)
        expect(result).toBe(expected)
    })

})
