'use strict'
const get = require('./request')
const { auth, url, goal, pointsMinute, startDate, endDate, dsn, qld, workdays } = require('./configs')
const parser = require('./parser')
const { updatePlayer, crud } = require('./db')

const saveData = ( data, user ) => {
    const issues = parser(data)
    const player = { username: user }
    const month = 'ago'

    const  updatingPlayer = updatePlayer( player )
    
    updatingPlayer.updateIssuesOn( month, issues,  () => '' )
    updatingPlayer.updatemonthField( month, {field: 'goal', value: goal(user)}, () => '' )
    updatingPlayer.updatemonthField( month, {field: 'pointsPerHour', value: pointsMinute(user)}, () => '' )
    updatingPlayer.updatemonthField( month, {field: 'workdays', value: workdays()}, () => '' )
    
    console.log(`${user} updated!`)
}

const saveUserData = user => {
    const filterUrl = url( startDate(), endDate(), user )
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    get(filterUrl, options)
        .then( response => saveData(response.data, user) )
        .catch( response => console.log( `Error: ${response.message}` ) )    
}


const players = [ ...dsn, ...qld ]
players.map( saveUserData )

crud.find( {}, (err, docs) => docs ? console.log(docs)  : console.log('not found') )