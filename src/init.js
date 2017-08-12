'use strict'

const { dsn, qld } = require('./configs')
const { crud } = require('./db')

const monthsName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov',  'dec' ]
const months = {}

monthsName.forEach( month => 
    (
        months[ month ] = {
            issues: [], // list of issues objects
            goal: 0, 
            workdays: 0, 
            pointsPerHour: 0
        }
    )
)

const saveUser = username => {
    const player = {
        username, // username da empresa
        months,
        slackId: username,
        channel: '', // canal do slack 
        updated: new Date(), //timestamp da ultima atualização no jira
        isAdmin: false // bool
    }

    crud.save( player, (err, newDoc) => {
        if ( err ) throw err

        console.log(`${newDoc.username} created!`)
    } )
}

const players = [ ...dsn, ...qld ]
players.map( saveUser )

crud.count( {}, (err, count) => count ? console.log(`\n\n${count} people was saved!`)  : console.log('not found') )