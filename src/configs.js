'use strict'

const { loadFileSync } = require('./utils')
const urlProd = require('./url')

const isDev = process.env.ENV_DEV == 'true'
const filename = isDev ? './tests/fixtures/env_test' : './.env'
const config = JSON.parse( loadFileSync( filename, "utf8") )
const isDSN = ( user ) => /.*dsn.*/.test(user)

const urlDev = () => config.domain

const url = ( startDate, endDate, user=config.login ) => 
    isDev ? urlDev() : urlProd( startDate, endDate, user )

const goal = ( user='someone.dsn.cir' ) => 
    isDSN(user) ? parseInt(config.goalDSN) : parseInt(config.goalQLD)

const pointsMinute = ( user='someone.dsn.cir' ) => 
   isDSN(user) ? (parseInt(config.pointsHourDSN)) : (parseInt(config.pointsHourQLD))

const workdays = () => parseInt(config.workdays)

const dsn =  config.dsn
const qld =  config.qld
const admins =  config.admins
const startDate = () => config.startDate
const endDate = () => config.endDate

module.exports = {
    url,
    goal,
    pointsMinute,
    workdays,
    isDev,
    startDate,
    endDate,
    config
}
