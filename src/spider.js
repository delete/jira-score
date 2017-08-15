'use strict'
const get = require('./request')
const { url, config, startDate, endDate, workdays } = require('./configs')
const auth = require('./auth')
const parser = require('./parser')
const { crud } = require('./db')

const isDSN = ( user ) => /.*dsn.*/.test(user)
const goal = ( user='someone.dsn.cir' ) => 
    isDSN(user) ? parseInt(config.goalDSN) : parseInt(config.goalQLD)

const pointsPerHour = ( user='someone.dsn.cir' ) => 
   isDSN(user) ? (parseInt(config.pointsHourDSN)) : (parseInt(config.pointsHourQLD))

const saveData = ( data, username ) => {
    const issues = parser( data )
    const player = { username: username }
    const month = 'aug'
    const userGoal = goal( username )
    const userPointsHour = pointsPerHour( username )
    console.log(`${username} -> goal: ${userGoal} -> points: ${userPointsHour} -> issues: ${issues.length}`)

    // Clear issues before update the list
    crud.update(player, { $push: { [`months.${month}.issues`]: { $slice: 0 } } }, {}, () => {
        crud.update(player, { $set: { [`months.${month}.issues`]: issues } }, {} )
    })
    crud.update(player, { $set: { [`months.${month}.goal`]: userGoal } }, {} )
    crud.update(player, { $set: { [`months.${month}.pointsPerHour`]: userPointsHour } }, {} )
    crud.update(player, { $set: { [`months.${month}.workdays`]: workdays() } }, {} )
}

const saveUserData = username => {
    const filterUrl = url( startDate(), endDate(), username )
    const headers = { 'Authorization': `Basic ${auth( config.login, config.pass )}` }
    const options = { headers }

    get(filterUrl, options)
        .then( response => saveData(response.data, username) )
        .catch( response => console.log( `Error: ${response.message}` ) )
}


const players = [ ...config.dsn, ...config.qld ]
players.map( saveUserData )