const isString = ( value ) => typeof( value ) === 'string'

const subscribe = ( message, sender ) => ( pattern, callback ) => {
    if ( isString(pattern) ) {
        if ( message.text !== pattern ) return
    } else {
        if ( !pattern.test( message.text ) ) return
    }
    
    const response = callback();

    if ( isString( response) ) {
        sender( response, message.channel )
    } else {
        // promise
        console.log('entrouuuuuuuu')
        response.then( function (msg) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAa', msg)

            sender( msg, message.channel )
        })
    }
}

module.exports = subscribe