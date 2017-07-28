'use strict'

const fs = require('fs')
const { toBase64 } = require('./utils')
const makeQuery = require('./query')

const config = JSON.parse(fs.readFileSync('.env', 'utf8'));

const to64 = ( login, pass ) => toBase64(`${login}:${pass}`)

const auth = () => to64(config.login, config.pass)

const _url = () => `http://${config.domain}/rest/api/2/search`

const getQuery = () => '&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200'

const url = ( startDate='2017-06-01', endDate='2017-06-30', user=config.login ) => 
    [
        `${_url()}`,
        encodeURI( `${makeQuery( user, startDate, endDate )}${getQuery()}` )
    ].join('')

// const url = () => 'http://127.0.0.1:8080/issues.json'

const goal = ( user='someone.dsn.cir' ) => 
    /.*dsn.*/.test(user) ? parseInt(config.goalDSN) : parseInt(config.goalQLD)

const pointsMinute = ( user='someone.dsn.cir' ) => 
    /.*dsn.*/.test(user) ? (parseInt(config.pointsHourDSN)) : (parseInt(config.pointsHourQLD))

const workdays = () => parseInt(config.workdays)

const dsn =  config.dsn
const qld =  config.qld

module.exports = {
    auth,
    url,
    goal,
    pointsMinute,
    workdays,
    dsn,
    qld
}
