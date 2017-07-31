'use strict'

const and = () => 'AND'
const isNot = () => 'is not'
const empty = () => 'EMPTY'
const lessOrEqualThan = () => '<='
const moreOrEqualThan = () => '>='
const orderBy = ( string ) => `ORDER BY ${string}`
const assignee = ( user ) => `assignee = ${user}`

// module.exports = ( user, startDate, endDate ) => `?jql=category = Cirrus AND issuetype not in (Epic) AND status changed to (Pronto, Finalizado, "Finalizado / Liberado") during (${startDate}, "${endDate} 23:59")  AND status was not in (Pronto, Finalizado, "Finalizado / Liberado") before ${startDate} AND assignee in (${user})`
module.exports = ( user, startDate, endDate ) =>
 [
        `?jql=category = Cirrus`,
        `${and()}`,
        `"Dificuldade de Implementação" ${isNot()} ${empty()}`,
        `${and()}`,
        `resolution = Resolvido`,
        `${and()}`,
        `${assignee(user)}`,
        `${and()}`,
        `resolved ${moreOrEqualThan()} ${startDate}`,
        `${and()}`,
        `resolved ${lessOrEqualThan()} "${endDate} 23:59"`,
        `${orderBy('cf[17132] ASC, resolved DESC')}`
    ].join(' ')