'use strict'
const get = require('./request')
const { auth, url, goal, pointsMinute, startDate, endDate, dsn, qld, workdays } = require('./configs')
const parser = require('./parser')
const { crud } = require('./db')

const saveData = ( data, username ) => {
    const issues = parser( data )
    const player = { username: username }
    const month = 'aug'
    const userGoal = goal( username )
    const userPointsHour = pointsMinute( username )
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
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    get(filterUrl, options)
        .then( response => saveData(response.data, username) )
        .catch( response => console.log( `Error: ${response.message}` ) )
}


const players = [ ...dsn, ...qld ]
players.map( saveUserData )