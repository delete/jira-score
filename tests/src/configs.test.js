const { loadFile } = require('../../src/utils')
const ENV_FILE_DEV = './tests/fixtures/env_test'


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
                workdays: "21",
                startDate: "2017-08-01",
                endDate: "2017-08-31",
                dsn: [
                    "person1",
                    "person2"
                ],
                qld: [
                    "person3",
                    "person4"
                ],
                admins: [
                    "person1"
                ]
            }
            
            fields.map( field  => expect( dataObj[field] ).toEqual( expectedValues[field] ) )

            done()
        })
    })
})

