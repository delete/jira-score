const RtmClient = require('@slack/client').RtmClient
const RTM_EVENTS = require('@slack/client').RTM_EVENTS
const emitter = require('./eventBus')
const subscribe = require('./subscribe')
const messages = require('./messages')
const {
    GOOD_MORNING,
    HELLO,
    HELP,
    MY_SELF,
    POINTS,
    ISSUES,
    LOGIN,
    GOAL,
    TOP10
} = require('./response').patterns
const { 
    goodMorning,
    hello,
    help,
    mySelf,
    requestIssues,
    login,
    top10
} = require('./response').callbacks
// Load listeners
require('./commands')
require('./middlewares')

const bot_token = process.env.SLACK_BOT_TOKEN || ''
const rtm = new RtmClient(bot_token)

const sender = ( response, channel ) => rtm.sendMessage( response, channel ) 
emitter.on( 'SEND', sender )

// General commands
rtm.on(RTM_EVENTS.MESSAGE, message => {    
    const runOn = subscribe({ message })
    
    runOn( GOOD_MORNING, goodMorning )
    runOn( HELLO, hello )
    runOn( HELP, help )
    runOn( MY_SELF, mySelf )
    runOn( LOGIN, login )
    runOn( TOP10, top10 )
})

rtm.on(RTM_EVENTS.MESSAGE, message => {
    const event = 'SCORE'
    const runOn = subscribe({ message, event })
    runOn( POINTS, requestIssues )
})

rtm.on(RTM_EVENTS.MESSAGE, message => {
    const event = 'ISSUES'
    const runOn = subscribe({ message, event })
    runOn( ISSUES, requestIssues )
})

rtm.on(RTM_EVENTS.MESSAGE, message => {
    const event = 'GOAL'
    const runOn = subscribe({ message, event })
    runOn( GOAL, requestIssues )
})

rtm.start()
