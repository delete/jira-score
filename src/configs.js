'use strict'

const fs = require('fs')
const { toBase64 } = require('./utils')

const config = JSON.parse(fs.readFileSync('.env', 'utf8'));

const to64 = ( login, pass ) => toBase64(`${login}:${pass}`)

const auth = () => to64(config.login, config.pass)

const _url = () => `http://${config.domain}/rest/api/2/search`

const url = ( startDate='2017-06-01', endDate='2017-06-30', user=config.login ) => _url() + encodeURI(`?jql=category = Cirrus AND "Dificuldade de Implementação" is not EMPTY AND resolution = Resolvido AND assignee = ${user} AND resolved >= ${startDate} AND resolved <= "${endDate} 23:59" ORDER BY cf[17132] ASC, resolved DESC&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200`)

const goal = ( user='someone.dsn.cir' ) => /.*dsn.*/.test(user) ? parseInt(config.goalDSN) : parseInt(config.goalQLD)

module.exports = {
    auth,
    url,
    goal
}
