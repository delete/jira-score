const messages = require('../messages')
const emitter = require('../eventBus')
const { sumPontuation, minutesToPoints, sumTime } = require('../../src/filters')
const { crud } = require('../../src/db')
const { admins } = require('../../src/configs')

const isAdmin = ( user ) => admins.includes( user ) 
const reachedGoal = ( points, goal ) => points > goal ? ':sunglasses:' :  ''
const sortByPoints = ( people ) => [...people].sort( (a,b) => b.points - a.points );
const printPerson = ( person, index ) => `${index}º - ${person.username} ${reachedGoal(person.points, person.goal)}`
const printPersonAsAdmin = ( person, index ) => `${index + 1}º - ${person.username}  => ${person.points} - ${person.issues.length} issues ${reachedGoal(person.points, person.goal)}`
const sendResponse = ( response, channel ) => emitter.emit('SEND', response, channel )

const mountResponse = ( user, players, month ) => {
    const playerWithPoints = players.map( player =>  {
        const { username } = player
        const { issues, pointsPerHour, goal } = player.months[month]
        const issuesPoints = sumPontuation( issues )
        const costumerServicePoints = minutesToPoints( sumTime( issues, 'Atendimento' ), pointsPerHour )
        const points = issuesPoints + costumerServicePoints

        return { username, points, issues, goal }
    })
    const playersTop = sortByPoints( playerWithPoints)
    const topTen = playersTop
        .map( isAdmin(user) ? printPersonAsAdmin : printPerson )
        .slice(0, 10)
        .join('\n')

    return topTen  
}

const mountTop = ( user, month, channel, topMessage ) => players => {
        const response = mountResponse( user, players, month )
        sendResponse( topMessage, channel )
        sendResponse( response, channel )
    }

const top10 = ( message ) => {
    const { channel, user } = message
    const month = 'aug'
    const dsnPlayers = {username: /.*dsn.*/ }
    const qldPlayers = {username: /.*qld.*/ }
    
    const mountTopDsnWith = mountTop( user, month, channel, '*TOP 10 do desenvolvimento:*' )
    const mountTopToQldWith = mountTop( user, month,  channel,  '*TOP 10  da qualidade:* ')

    // Must reload the database to get the new values
    crud.db.loadDatabase(function (err) {
        if ( err ) throw err

        // Get all DSN
        crud.find( dsnPlayers, (err, docs) => {
            if ( err ) throw err

            if ( docs.length ) mountTopDsnWith( docs )
        })

        // Get all QLD
        crud.find( qldPlayers, (err, docs) => {
            if ( err ) throw err

            if ( docs.length ) mountTopToQldWith( docs )                
        })

    });
}

console.log('on TOP10')
module.exports = top10