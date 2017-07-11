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

    return get(filterUrl, options)
        .then( response => {
            const jira = parser(response.data)
            const scored = jira.pontuation()
            return `Total de pontos: ${scored}`
        })
        .catch( response => `Error: ${response.message}` )
}
