process.env.ENV_DEV = 'false'

const { loadFile } = require('../../src/utils')
const ENV_FILE_DEV = './tests/fixtures/env_test'

const configs = require('../../src/configs')


describe('Test configs file', () => {
    test('File must have the expected data', done => {

        loadFile(ENV_FILE_DEV, (err, data) => {
            if (err) throw err
            
            const dataObj = JSON.parse(data)
            const fields = Object.keys(dataObj)
            
            const expectedValues = {
                login: "fellipe.user",
                pass: "123213",
                domain: "http://127.0.0.1:8080/issues.json",
                goalDSN: "3528",
                goalQLD: "2500",
                pointsHourDSN: "21",
                pointsHourQLD: "16",
                workdays: "21"
            }
            
            fields.map( field  => expect( dataObj[field] ).toBe( expectedValues[field] ) )

            done()
        })
    })
})

describe('Test with ENV_DEV variable', () => {

    test('isDev method must return false', () => {
        const actual = configs.isDev
        const expected = false
        expect( actual ).toBe( expected)
    })

})
