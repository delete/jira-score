process.env.ENV_DEV = 'false'
const configs = require('../../src/configs')
const { loadFile } = require('../../src/utils')

const ENV_FILE = './tests/fixtures/env_test'

describe('Test configs file', () => {
    test('File must have the expected data', done => {

        loadFile(ENV_FILE, (err, data) => {
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

    test('Url must return the entire path to prod environment', () => {
        const actual = configs.url()
        const expected = "http://127.0.0.1:8080/issues.json/rest/api/2/search?jql=category%20=%20Cirrus%20AND%20%22Dificuldade%20de%20Implementa%C3%A7%C3%A3o%22%20is%20not%20EMPTY%20AND%20resolution%20=%20Resolvido%20AND%20assignee%20=%20fellipe.dsn.cir%20AND%20resolved%20%3E=%202017-06-01%20AND%20resolved%20%3C=%20%222017-06-30%2023:59%22%20ORDER%20BY%20cf%5B17132%5D%20ASC,%20resolved%20DESC&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200"
        expect( actual ).toBe( expected)
    })
})

