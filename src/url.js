'use strict'

const { config } = require('./configs')
const makeQuery = require('./query')

const getParams = () => 
    '&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200'

const domain = () => `http://${config.domain}/rest/api/2/search`

const url = ( startDate, endDate, user ) => {
    const query = makeQuery( user, startDate, endDate )
    const queryString = query.faster()
    const params = getParams()
    const uri = encodeURI( `${queryString}${params}`  )

    return `${domain()}${uri}`
}

module.exports = ( startDate, endDate, user ) => url( startDate, endDate, user )