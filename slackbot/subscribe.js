const subscribe = ( message, sender ) => ( pattern, callback ) => {
    if ( typeof( pattern ) === 'string' ) {
        if ( message.text !== pattern ) return
    } else {
        if ( !pattern.test( message.text ) ) return
    }

    const response = callback();
    
    sender( response, message.channel )
}

module.exports = subscribe