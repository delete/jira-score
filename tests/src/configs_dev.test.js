process.env.ENV_DEV = 'true'
const configs = require('../../src/configs')

describe('Test with ENV_DEV variable', () => {
    test('isDev method must return true', () => {
        const actual = configs.isDev
        const expected = true
        expect( actual ).toBe( expected)
    })    

    test('Configs must return an literal object', () => {
        expect( typeof configs ).toBe( 'object' )
    })
  
    test('goal method must return 3528 to DSN usrs', () => {
        const actual = configs.goal('user.dsn.cir')
        const expected = 3528
        expect( actual ).toBe( expected)
    })

    test('goal method must return 2500 to QLD usrs', () => {
        const actual = configs.goal('user.qld.cir')
        const expected = 2500
        expect( actual ).toBe( expected)
    })

    test('goal method must return 21 to DSN usrs', () => {
        const actual = configs.pointsMinute('user.dsn.cir')
        const expected = 21
        expect( actual ).toBe( expected)
    })

    test('goal method must return 16 to QLD usrs', () => {
        const actual = configs.pointsMinute('user.qld.cir')
        const expected = 16
        expect( actual ).toBe( expected)
    })

    test('url method must return http://127.0.0.1:8080/issues.json to dev environment', () => {
        const actual = configs.url()
        const expected = "http://127.0.0.1:8080/issues.json"
        expect( actual ).toBe( expected)
    })

    test('start date must return 2017-08-01', () => {
        const actual = configs.startDate()
        const expected = '2017-08-01'
        expect( actual ).toBe( expected )
    })

    test('end date must return 2017-08-31', () => {
        const actual = configs.endDate()
        const expected = '2017-08-31'
        expect( actual ).toBe( expected )
    })
})