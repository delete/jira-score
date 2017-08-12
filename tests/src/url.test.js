process.env.ENV_DEV = 'true'

const url = require('../../src/url')

test('Must return the hole query with the right inputs"', () => {
    const user = 'iamanuser'
    const startDate = '2017-06-01'
    const endDate = '2017-06-30'

    const result = url( startDate, endDate, user )
    
    const expected = encodeURI('http://http://127.0.0.1:8080/issues.json/rest/api/2/search?jql=category = Cirrus AND "Dificuldade de Implementação" is not EMPTY AND resolution = Resolvido AND assignee = iamanuser AND resolved >= 2017-06-01 AND resolved <= "2017-06-30 23:59" ORDER BY cf[17132] ASC, resolved DESC&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200')

    expect(result).toBe(expected)
})