'use strict'

const fs = require('fs')
const { toBase64 } = require('./utils')

const config = JSON.parse(fs.readFileSync('.env', 'utf8'));

const to64 = ( login, pass ) => toBase64(`${login}:${pass}`)

const auth = () => to64(config.login, config.pass)

const url = () => `http://${config.domain}/issues/?filter=${config.filter_id}`

const meta = () => config.meta

module.exports = {
    auth,
    url,
    meta
}
