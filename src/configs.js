'use strict'

const fs = require('fs')
const { toBase64 } = require('./utils')

const config = JSON.parse(fs.readFileSync('.env', 'utf8'));

const to64 = ( login, pass ) => toBase64(`${login}:${pass}`)

const auth = () => to64(config.login, config.pass)

const filterUrl = () => `http://${config.domain}/issues/?filter=${config.filter_id}`
const query = ( startDate, endDate, user ) => `&jql=category%20%3D%20Cirrus%20AND%20%22Dificuldade%20de%20Implementa%C3%A7%C3%A3o%22%20is%20not%20EMPTY%20AND%20resolution%20%3D%20Resolvido%20AND%20assignee%20%3D%20${user}%20AND%20resolved%20%3E%3D%20${startDate}%20AND%20resolved%20%3C%3D%20%22${endDate}%2023%3A59%22%20ORDER%20BY%20cf%5B17132%5D%20ASC%2C%20resolved%20DESC`

const url = (startDate, endDate, user=config.login) => filterUrl() + query( startDate, endDate, user )

module.exports = {
    auth,
    url
}
