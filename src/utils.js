'use strict'

const fs = require('fs')

const toBase64 = ( string ) =>  Buffer.from(string).toString('base64')

const loadFile = ( name, callback ) => fs.readFile(name, "utf8", callback)
const loadFileSync = ( name ) => fs.readFileSync(name, "utf8")

const splitStringAndReturnLast = ( rawString ) => {
    const stringSplitted = rawString.split('-')
    const lastIndex = stringSplitted.length - 1
    return stringSplitted[ lastIndex ].trim()
}

const isWeekend = ( weekDay ) => ( weekDay === 0 || weekDay === 6 )

// TODO make this function more functional
const getWorkingDays = ( startDate, endDate ) => {
    let result = 0;

    let currentDate = startDate
    while ( currentDate <= endDate )  {
        const weekDay = currentDate.getDay();
        
        if ( !isWeekend( weekDay) ) result++;

        currentDate.setDate( currentDate.getDate() + 1 ); 
    }
    return result;
}

module.exports = {
    toBase64,
    loadFile,
    loadFileSync,
    splitStringAndReturnLast,
    getWorkingDays
}