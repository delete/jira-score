const makeQuery = require('../../src/query')

describe('Function: fast query', () => {
    test('Must return the hole query with the right inputs"', () => {
        const user = 'iamanuser'
        const startDate = '2017-06-01'
        const endDate = '2017-06-30'

        const result = makeQuery( user, startDate, endDate )
        
        const expected = '?jql=category = Cirrus AND "Dificuldade de Implementação" is not EMPTY AND resolution = Resolvido AND assignee = iamanuser AND resolved >= 2017-06-01 AND resolved <= "2017-06-30 23:59" ORDER BY cf[17132] ASC, resolved DESC'

        expect(result).toBe(expected)
    })
})