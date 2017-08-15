'use strict'

const { loadFileSync } = require('./utils')
const urlProd = require('./url')

const isDev = process.env.ENV_DEV == 'true'
const filename = isDev ? './tests/fixtures/env_test' : './.env'
const config = JSON.parse( loadFileSync( filename, "utf8") )

const urlDev = () => config.domain

const url = ( startDate, endDate, user=config.login ) => 
    isDev ? urlDev() : urlProd( config.domain, startDate, endDate, user )

const workdays = () => parseInt(config.workdays)

const dsn =  config.dsn
const qld =  config.qld
const admins =  config.admins
const startDate = () => config.startDate
const endDate = () => config.endDate

module.exports = {
    url,
    workdays,
    isDev,
    startDate,
    endDate,
    config,
    admins
}
