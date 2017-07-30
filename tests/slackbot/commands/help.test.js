const emitter = require('../../../slackbot/eventBus')
const { HELP } = require('../../../slackbot/messages/types')

const help = require('../../../slackbot/commands/help')

describe('Help command Must emit an event and data object', () => {
  
    describe('help command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            help( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and data', ( ) => {
            const data = {
                text: 'help me',
                channel: 'aaa',
                user: '1234'
            }
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            help( data )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualMessage, channel ] = eventSpy.mock.calls[0]

            expect( HELP ).toContain( actualMessage );
            expect( channel ).toBe( data.channel );
        })
    })
})