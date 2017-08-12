const makeQuery = require('../../src/query')

describe('Function: faster query', () => {
    test('Must return the hole query with the right inputs"', () => {
        const user = 'iamanuser'
        const startDate = '2017-06-01'
        const endDate = '2017-06-30'

        const query = makeQuery( user, startDate, endDate )
        const result = query.faster()
        
        const expected = '?jql=category = Cirrus AND "Dificuldade de Implementação" is not EMPTY AND resolution = Resolvido AND assignee = iamanuser AND resolved >= 2017-06-01 AND resolved <= "2017-06-30 23:59" ORDER BY cf[17132] ASC, resolved DESC'

        expect(result).toBe(expected)
    })
})

describe('Function: slower query', () => {
    test('Must return the hole query with the right inputs"', () => {
        const user = 'iamanuser'
        const startDate = '2017-06-01'
        const endDate = '2017-06-30'

        const query = makeQuery( user, startDate, endDate )
        const result = query.slower()
        
        const expected = `?jql=category = Cirrus AND issuetype not in (Epic) AND status changed to (Pronto, Finalizado, "Finalizado / Liberado") during (${startDate}, "${endDate} 23:59")  AND status was not in (Pronto, Finalizado, "Finalizado / Liberado") before ${startDate} AND assignee in (${user})`

        expect(result).toBe(expected)
    })
})