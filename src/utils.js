'use strict'

const fs = require('fs')

const toBase64 = ( string ) =>  Buffer.from(string).toString('base64')

const loadFile = ( name, callback ) => fs.readFile(name, "utf8", callback)

const splitStringAndReturnLast = ( rawString ) => {
    const stringSplitted = rawString.split('-')
    const lastIndex = stringSplitted.length - 1
    return stringSplitted[ lastIndex ].trim()
}

module.exports = {
    toBase64,
    loadFile,
    splitStringAndReturnLast
}