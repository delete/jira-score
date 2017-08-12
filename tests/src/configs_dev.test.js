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