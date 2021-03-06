const emitter = require('../../slackbot/eventBus')

const { callbacks } = require('../../slackbot/response')

describe('Must emit an event and data object', () => {
  
    describe('Good morning callback', () => {  
        it('should emit an "GOOD_MORNING"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('GOOD_MORNING', eventSpy )

            callbacks.goodMorning( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "GOOD_MORNING"', ( ) => {
            const message = {
                text: 'good morning',
                channel: 'aaa'
            }
            const eventSpy = jest.fn()
            emitter.on('GOOD_MORNING', eventSpy )

            callbacks.goodMorning( message )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message )
        })
    })

    describe('Hello callback', () => {
        it('should emit an "HELLO"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('HELLO', eventSpy )

            callbacks.hello( {} )
          
            expect(eventSpy).toBeCalled()
        })

        it('should emit an "HELLO"', ( ) => {
            const message = {
                text: 'hello',
                channel: 'aaa'
            }
            const eventSpy = jest.fn()
            emitter.on('HELLO', eventSpy )

            callbacks.hello( message )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message )
        })
    })

    describe('Help callback', () => {
        it('should emit an "HELP"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('HELP', eventSpy )

            callbacks.help( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "HELP"', ( ) => {
            const message = {
                text: 'help',
                channel: 'aaa'
            }
            const eventSpy = jest.fn()
            emitter.on('HELP', eventSpy )

            callbacks.help( message )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message )
        })
    })

    describe('My self callback', () => {
        it('should emit an "MY_SELF"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('MY_SELF', eventSpy )

            callbacks.mySelf( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "MY_SELF"', ( ) => {
            const message = {
                text: 'my self',
                channel: 'aaa'
            }
            const eventSpy = jest.fn()
            emitter.on('MY_SELF', eventSpy )

            callbacks.mySelf( message )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message )
        })
    })

    describe('Load issues callback', () => {
        it('should emit an "LOAD_ISSUES"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('LOAD_ISSUES', eventSpy )

            callbacks.loadIssues( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "LOAD_ISSUES"', ( ) => {
            const message = {
                text: 'my score',
                channel: 'aaa'
            }
            const event = 'score'
            
            const eventSpy = jest.fn()
            emitter.on('LOAD_ISSUES', eventSpy )

            callbacks.loadIssues( message, event )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message, event )
        })
    })

    describe('Login callback', () => {
        it('should emit an "LOGIN"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('LOGIN', eventSpy )

            callbacks.login( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "LOGIN"', ( ) => {
            const message = {
                text: 'log me in',
                channel: 'aaa'
            }
           
            const eventSpy = jest.fn()
            emitter.on('LOGIN', eventSpy )

            callbacks.login( message )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message )
        })
    })

    describe('Player callback', () => {
        it('should emit an "PLAYER"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('PLAYER', eventSpy )

            callbacks.player( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "PLAYER"', ( ) => {
            const message = {
                text: 'player fellipe',
                channel: 'aaa'
            }
           
            const eventSpy = jest.fn()
            emitter.on('PLAYER', eventSpy )

            callbacks.player( message )

            expect(eventSpy).toBeCalled()
            expect(eventSpy).toBeCalledWith( message )
        })
    })
})