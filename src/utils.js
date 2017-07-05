'use strict'

const fs = require('fs')

const toBase64 = string =>  Buffer.from(string).toString('base64')

const loadFile = ( name, callback ) => fs.readFile(name, "utf8", callback)

const isWeek = ( string ) => /week/i.test(string)
const isDay = ( string ) => /day/i.test(string)
const isHour = ( string ) => /hour/i.test(string)

const hourToMin = ( value ) => value * 60
const dayToMin = ( value ) => 8 * hourToMin( value )
const weekToMin = ( value ) => 5 * dayToMin( value )

const timeStringToMinutes = ( rawString ) => {
    if ( !rawString ) return 0
    
    const timeList = rawString.split(',')
    const getIntegerValue = ( string ) => parseInt(string.match(/\d+/))

    return timeList.reduce((totalMinutes, time) => {
        const timeValue = getIntegerValue(time.trim())

        if ( isWeek(time) ) {
            return totalMinutes + weekToMin(timeValue)
        } else if ( isDay(time) ) {
            return totalMinutes + dayToMin(timeValue)
        } else if ( isHour(time) ) {
            return  totalMinutes + hourToMin(timeValue)
        } else {
            return totalMinutes + timeValue
        }
    }, 0)
}

module.exports = {
    toBase64,
    loadFile,
    timeStringToMinutes
}
