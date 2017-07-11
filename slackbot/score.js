'use strict'

const get = require('../src/request')
const { auth, url } = require('../src/configs')
const parser = require('../src/parser')

module.exports = user => {
    const startDate = '2017-07-01'
    const endDate = '2017-07-31'

    const filterUrl = url( startDate, endDate, user )
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    get(filterUrl, options)
        .then( response => `Total de pontos: ${parser(response).jira.scored()}` )
        .catch( response => console.log( `Error: ${response.message}` ) )
}