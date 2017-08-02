const isString = ( value ) => typeof( value ) === 'string'

const subscribe = ({ message, event = null}) => ( pattern, callback ) => {
    if ( isString(pattern) ) {
        if ( message.text !== pattern ) return
    } else {
        if ( !pattern.test( message.text ) ) return
    }
    callback( message, event );
}

module.exports = subscribe