process.env.ENV_DEV = 'true'

const url = require('../../src/url')

test('Must return the hole query with the right inputs"', () => {
    const user = 'iamanuser'
    const startDate = '2017-06-01'
    const endDate = '2017-06-30'
    const domain = '127.0.0.1:8080'

    const result = url( domain, startDate, endDate, user )
    
    const expected = `http://${domain}/rest/api/2/search?jql=category%20=%20Cirrus%20AND%20issuetype%20not%20in%20(Epic)%20AND%20status%20changed%20to%20(Pronto,%20Finalizado,%20%22Finalizado%20/%20Liberado%22)%20during%20(${startDate},%20%22${endDate}%2023:59%22)%20%20AND%20status%20was%20not%20in%20(Pronto,%20Finalizado,%20%22Finalizado%20/%20Liberado%22)%20before%20${startDate}%20AND%20assignee%20in%20(${user})&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200`

    expect(result).toBe(expected)
})