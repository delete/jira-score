'use strict'

const cheerio = require('cheerio')
const pontuations = require('./pontuations')

const filterElementDOM = ( element, toFilter ) => element.filter(toFilter).text().trim()
const getIssueKey = ( element ) => filterElementDOM(element, '.issuekey')
const getIssueDificulty = ( element ) => filterElementDOM(element, '.customfield_17132')
const getIssueType = ( element ) => filterElementDOM(element, '.customfield_21711')
const getCustomerServiceTime = ( element ) => filterElementDOM(element, '.timespent')

const formatDificultyString = ( rawString ) => {
    const stringSplitted = rawString.split('-')
    return stringSplitted[ stringSplitted.length - 1 ].trim()
}

const isWeek = ( string ) => string.length === 4
const isDay = ( string ) => string.length === 3
const isHour = ( string ) => string.length === 2

const formatTimeString = ( rawString ) => {
    const time = rawString.match(/\d+/g);
    let minutes = 0
    if ( time ) {
        if ( isWeek(time) ) {
            minutes = (parseInt(time[0]) * 5 * 8 * 60) + (parseInt(time[1]) * 8 * 60) + (parseInt(time[2]) * 60) + parseInt(time[3])
        } else if ( isDay(time) ) {
            minutes = (parseInt(time[0]) * 8 * 60) + (parseInt(time[1]) * 60) + parseInt(time[2])
        } else if ( isHour(time) ) {
            minutes = (parseInt(time[0]) * 60) + parseInt(time[1])
        } else {
            minutes = parseInt(time[0])
        }
    }
    return minutes
}

const getIssueInfoFromRow = ( row ) =>  {
    const children = row.children()
    const key = getIssueKey(children)
    const type = getIssueType(children)
    const customerServiceTime = getCustomerServiceTime(children)
    const difficulty = getIssueDificulty(children)
    
    return {
        key,
        type,
        time: formatTimeString(customerServiceTime),
        difficulty: formatDificultyString(difficulty)
    }
}
const hasScore = issue => issue.pontuation > 0

module.exports = ( body ) => {
    const $ = cheerio.load( body )
    const tableBody = $('#issuetable tbody tr')
    let totalPontuation = 0
    let totalcustomerService = 0
    let totalCustomerServiceTime = 0
    const allIssues = []
    
    tableBody.each(function() {
        const issue = getIssueInfoFromRow( $(this) )

        if ( issue.type === 'Atendimento' ) {
            totalcustomerService += 1
            totalCustomerServiceTime += issue.time
        }

        if ( issue.difficulty && issue.type !== 'Atendimento' ) {
            issue.pontuation = pontuations(issue.difficulty)
        } else {
            issue.pontuation = 0
        }
        totalPontuation += issue.pontuation

        allIssues.push( issue )
    }) 
    
    const scoredIssues = allIssues.filter( issue => hasScore(issue) )

    return {
        total: () => allIssues.length,
        pontuation: () => totalPontuation,
        issues: () => allIssues,
        scored: () => scoredIssues.length,
        scoredIssues: () => scoredIssues,
        customerService: () => totalcustomerService,
        customerServiceTime: () => totalCustomerServiceTime
    }
}
