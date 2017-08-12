'use strict'

const makeQuery = ( user, startDate, endDate ) => {

    const slower = () => 
        `?jql=category = Cirrus AND issuetype not in (Epic) AND status changed to (Pronto, Finalizado, "Finalizado / Liberado") during (${startDate}, "${endDate} 23:59")  AND status was not in (Pronto, Finalizado, "Finalizado / Liberado") before ${startDate} AND assignee in (${user})`

    const faster = () =>
        `?jql=category = Cirrus AND "Dificuldade de Implementação" is not EMPTY AND resolution = Resolvido AND assignee = ${user} AND resolved >= ${startDate} AND resolved <= "${endDate} 23:59" ORDER BY cf[17132] ASC, resolved DESC`

    return {
        faster,
        slower
    }
}

module.exports = makeQuery