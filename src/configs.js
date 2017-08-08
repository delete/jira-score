'use strict'

const { loadFileSync } = require('./utils')
const makeQuery = require('./query')

const isDev = process.env.ENV_DEV == 'true'
const filename = isDev ? './tests/fixtures/env_test' : './.env'
const config = JSON.parse( loadFileSync( filename, "utf8") )
const isDSN = ( user ) => /.*dsn.*/.test(user)

const _url = () => `http://${config.domain}/rest/api/2/search`
const getParams = () => '&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200'
const urlProd = ( startDate, endDate, user ) => 
    [`${_url()}`, encodeURI( `${makeQuery( user, startDate, endDate ).faster()}${getParams()}` ) ].join('')

const urlDev = () => config.domain

const url = ( startDate='2017-06-01', endDate='2017-06-30', user=config.login ) => 
    isDev ? urlDev() : urlProd( startDate, endDate, user )

const goal = ( user='someone.dsn.cir' ) => 
    isDSN(user) ? parseInt(config.goalDSN) : parseInt(config.goalQLD)

const pointsMinute = ( user='someone.dsn.cir' ) => 
   isDSN(user) ? (parseInt(config.pointsHourDSN)) : (parseInt(config.pointsHourQLD))

const workdays = () => parseInt(config.workdays)
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
