const emitter = require('../../eventBus')
const { GOOD_MORNING } = require('../../messages/types')

const goodMorning = require('../../commands/good-morning')

describe('Must emit an event and data object', () => {
  
    describe('Good morning callback', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            goodMorning( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and data', ( ) => {
            const data = {
                text: 'good morning',
                channel: 'aaa'
            }
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            goodMorning( data )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualMessage, channel ] = eventSpy.mock.calls[0]
            expect( GOOD_MORNING ).toContain( actualMessage );
            expect( channel ).toBe( data.channel );
        })
    })
})