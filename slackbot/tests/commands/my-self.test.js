const emitter = require('../../eventBus')
const { MY_SELF } = require('../../messages/types')

const mySelf = require('../../commands/my-self')

describe('MySelf command Must emit an event and data object', () => {
  
    describe('mySelf command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            mySelf( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and data', ( ) => {
            const data = {
                text: 'jira',
                channel: 'aaa',
                user: '1234'
            }
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            mySelf( data )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualMessage, channel ] = eventSpy.mock.calls[0]

            expect( MY_SELF ).toContain( actualMessage );
            expect( channel ).toBe( data.channel );
        })
    })
})