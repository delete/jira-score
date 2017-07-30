const emitter = require('../../slackbot/eventBus')
const { WELCOME, USER_FOUND } = require('../../slackbot/messages/types')
const { login, logout, isLogged, getUser } = require('../../slackbot/auth')

const message = {
    text: 'entrar fellipe.user',
    channel:  'aaa',
    user: '1234'
}

beforeEach(() => {
  logout()
});

describe('Auth module', () => {
  
    describe('login command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            login( message )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some welcome message and a channel', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            login( message )

            // Both params are passing as only one, the first
            const [ actualMessage, channel ] = eventSpy.mock.calls[0]
            expect( WELCOME ).toContain( actualMessage );
            expect( channel ).toBe( message.channel );
        })

        it('should emit an "SEND" wit some ser found message and a channel', ( ) => {
            const eventSpy = jest.fn()
            // first login
            login( message )
            // then listen to the channel, to get the second login
            emitter.on('SEND', eventSpy )
            login( message )

            // Both params are passing as only one, the first
            const [ actualMessage, channel ] = eventSpy.mock.calls[0]
            expect( USER_FOUND ).toContain( actualMessage );
            expect( channel ).toBe( message.channel );
        })
    })

    describe('isLogged command', () => {
        it('Must return true when a user as already logged in', ( ) => {
            login( message )
            
            const expected = true
            const actual = isLogged( message.user )
            
            expect( actual ).toBe( expected );
        })

        it('Must return false when a user IS NOT logged in', ( ) => {
            const expected = false
            const actual = isLogged( message.user )
            
            expect( actual ).toBe( expected );
        })
    })

    describe('getUser command', () => {
        it('Must return the logged user', ( ) => {
            login( message )
            
            const expected = 'fellipe.user'
            const actual = getUser( message.user )
            
            expect( actual ).toBe( expected );
        })
    })
})