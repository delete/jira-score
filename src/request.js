'use strict'

const axios = require('axios')

module.exports = ( url, options ) => {
    return axios.get( url, options )
}
