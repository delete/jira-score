const types = require('../../slackbot/messages/types')
const messages = require('../../slackbot/messages')

describe('Must return a message containing in the list', () => {
  
    describe('DONT_GET_IT message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'DONT_GET_IT' )

            expect( types.DONT_GET_IT ).toContain( actual );
        })
    })

    describe('ERROR_BOT message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'ERROR_BOT' )

            expect( types.ERROR_BOT ).toContain( actual );
        })
    })

    describe('ERROR_JIRA message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'ERROR_JIRA' )

            expect( types.ERROR_JIRA ).toContain( actual );
        })
    })

    describe('GOOD_MORNING message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'GOOD_MORNING' )

            expect( types.GOOD_MORNING ).toContain( actual );
        })
    })

    describe('USER_FOUND message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'USER_FOUND' )

            expect( types.USER_FOUND ).toContain( actual );
        })
    })

    describe('WELCOME message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'WELCOME' )

            expect( types.WELCOME ).toContain( actual );
        })
    })

    describe('USER_NEEDED message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'USER_NEEDED' )

            expect( types.USER_NEEDED ).toContain( actual );
        })
    })

    describe('ONE_THIRD message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'ONE_THIRD' )

            expect( types.ONE_THIRD ).toContain( actual );
        })
    })

    describe('LESS_HALF message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'LESS_HALF' )

            expect( types.LESS_HALF ).toContain( actual );
        })
    })

    describe('MORE_HALF message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'MORE_HALF' )

            expect( types.MORE_HALF ).toContain( actual );
        })
    })

    describe('MY_SELF message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'MY_SELF' )

            expect( types.MY_SELF ).toContain( actual );
        })
    })

    describe('HELLO message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'HELLO' )

            expect( types.HELLO ).toContain( actual );
        })
    })

    describe('HELP message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'HELP' )

            expect( types.HELP ).toContain( actual );
        })
    })

    describe('LOADING message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'LOADING' )

            expect( types.LOADING ).toContain( actual );
        })
    })

    describe('COMPLETED message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'COMPLETED' )

            expect( types.COMPLETED ).toContain( actual );
        })
    })

    describe('NOT_ADMIN message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'NOT_ADMIN' )

            expect( types.NOT_ADMIN ).toContain( actual );
        })
    })

    describe('USER_NOT_FOUND message', () => {  
        it('should return an message from the list', ( ) => {
            const actual = messages( 'USER_NOT_FOUND' )

            expect( types.USER_NOT_FOUND ).toContain( actual );
        })
    })

    describe('default message', () => {  
        it('should return an errow if the options does not exist', ( ) => {
            const expectedError = new Error('Message not found')
            expect( messages( 'ANYTHING' ) ).toMatchObject( expectedError );
        })
    })
})