const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('.env', 'utf8'));

const base64 = Buffer.from(`${config.login}:${config.pass}`).toString('base64')
const filterUrl = `http://${config.domain}/issues/?filter=${config.id}`

const headers = { 'Authorization': `Basic ${base64}` }
const options = {
    url: filterUrl,
    headers
}

const pontuations = ( dificulty ) => {
    const dificulties = {
        'Muito simples': () => 30,
        'Simples': () => 75,
        'Média': () => 160,
        'Difícil': () => 320,
        'Muito difícil': () => 560,
    }
    return (dificulties[ dificulty ] || dificulties['Muito simples'])()
}

const printIssues = ( error, response, body ) => {
    if (error) console.log('Error on request!')

    const $ = cheerio.load( body )
    const tableBody = $('#issuetable tbody tr')
    let totalIssues = 0
    let totalPontuation = 0

    tableBody.each(function() {
        const children = $(this).children()
        const issueKey = $(children).filter('.issuekey').text().trim()
        let issueDifficulty = $(children).filter('.customfield_17132').text().trim()
        
        const issueDifficultySplitted = issueDifficulty.split('-')
        issueDifficulty = issueDifficultySplitted[ issueDifficultySplitted.length - 1 ].trim()
        
        if ( issueDifficulty ) {
            totalIssues++
            const pontuation = pontuations(issueDifficulty)
            totalPontuation += pontuation
            console.log( `${issueKey} -> ${issueDifficulty} -> ${pontuation}` )
        }
    })
    
    console.log(`Total issues: ${totalIssues}`)
    console.log(`Total pontuation: ${totalPontuation}`)
}
request(options, printIssues)
