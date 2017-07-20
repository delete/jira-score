const messages = require('../messages')

const goodMorning = () => messages('GOOD_MORNING')
const help = () => messages('HELP')
const mySelf = () => messages('MY_SELF')

const hello = ( user ) => {
    const sayHello = messages('HELLO')
    return sayHello( user )
}

module.exports = {
    goodMorning,
    hello,
    help,
    mySelf
}