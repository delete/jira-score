'use strict'

const fs = require('fs')

const toBase64 = string =>  Buffer.from(string).toString('base64')

const loadFile = ( name, callback ) => fs.readFile(name, "utf8", callback)

module.exports = {
    toBase64,
    loadFile
}
