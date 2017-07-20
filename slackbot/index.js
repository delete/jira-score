const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const subscribe = require('./subscribe')
const {
    score
} = require('./commands')
const {
    GOOD_MORNING,
    HELLO,
    HELP,
    MY_SELF,
    POINTS
} = require('./response').patterns
const { 
    goodMorning,
    hello,
    help,
    mySelf
} = require('./response').callbacks

const bot_token = process.env.SLACK_BOT_TOKEN || ''
const rtm = new RtmClient(bot_token);

const sender = ( response, channel ) => rtm.sendMessage( response, channel )

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    const runOn = subscribe( message, sender  )    
    const user = message.user

    // pattern, callback
    runOn( GOOD_MORNING, goodMorning )
    runOn( HELLO, () => hello( user ) )
    runOn( HELP, help )
    runOn( MY_SELF, mySelf )
    runOn( POINTS, () => score( user ) )
});

rtm.start()
