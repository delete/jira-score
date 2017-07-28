const messages = require('../messages')
const emitter = require('../eventBus')
const { getUser } = require('../auth')
const { sumPontuation } = require('../../src/filters')

const get = require('../../src/request')
const { auth, url } = require('../../src/configs')
const parser = require('../../src/parser')
const { goal, dsn, qld } = require('../../src/configs')

const requestIssue = (  username ) => {
    const startDate = '2017-07-01'
    const endDate = '2017-07-31'

    const filterUrl = url( startDate, endDate, username )
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    return get(filterUrl, options)
        .then( ( response ) => parser(response.data) )
        .catch( jiraErrorMessage )
}

const jiraErrorMessage = ( response ) => {
    console.log( `Command loadIssues error: ${response}` )
    return messages('ERROR_JIRA')
}

const reachedGoal = ( points, user ) => points > goal( user ) ? ':sunglasses:' :  ''
const sortByPoints = ( people ) => [...people].sort( (a,b) => b.points - a.points );

const mountResponse = ( people, channel ) => {
    const peopleWithPoints = people.map( person =>  {
        return {
            username: person.username,
            points: sumPontuation( person.issues )
        }
    })
    const peopleTop = sortByPoints( peopleWithPoints)
    const topTen = peopleTop
        .map( (person, index) => `${index}º - ${person.username}  ${reachedGoal( person.points, person.username )}`)
        .slice(0, 10)
        .join('\n')

    emitter.emit('SEND', topTen, channel )
}

const top10 = ( message ) => {
    const { channel } = message
    emitter.emit('SEND', messages('LOADING'), channel )

    const devs = dsn.map( dev => 
        requestIssue( dev ).then( issues  => ( { username: dev, issues } ) ) )

    const qlds = qld.map( q => 
        requestIssue( q ).then( issues  => ( { username:q, issues } ) ) )
    
    Promise.all(devs)
       .then(( devs ) => {
            emitter.emit('SEND', '*TOP 10 do desenvolvimento:* ', channel )
            mountResponse( devs, channel )
        })

    Promise.all(qlds)
       .then(( qlds ) => {
            emitter.emit('SEND', '*TOP 10 da qualidade:* ', channel )
            mountResponse( qlds, channel )
        })
}
console.log('on TOP10')
module.exports = top10