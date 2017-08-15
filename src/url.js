'use strict'

// const { config } = require('./configs')
const makeQuery = require('./query')

const getParams = () => 
    '&fields=assignee,project,customfield_21711,issuetype,timespent,customfield_17132&maxResults=200'

const baseUrl = domain => `http://${domain}/rest/api/2/search`

module.exports = ( domain, startDate, endDate, user ) => {
    const query = makeQuery( user, startDate, endDate )
    const queryString = query.slower()
    const params = getParams()
    const uri = encodeURI( `${queryString}${params}`  )

    return `${baseUrl( domain )}${uri}`
}