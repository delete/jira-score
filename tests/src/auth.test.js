const auth = require('../../src/auth')

describe('auth method must return login:pass as base64', () => {
    test('fellipe.user:123213 must return ZmVsbGlwZS51c2VyOjEyMzIxMw==', () => {
        const actual = auth('fellipe.user', '123213')
        const expected = 'ZmVsbGlwZS51c2VyOjEyMzIxMw=='
        expect( actual ).toBe( expected) 
    })

    test(' fellipe.user:33333 must NOT return ZmVsbGlwZS51c2VyOjEyMzIxMw==', () => {
        const actual = auth('fellipe.user', '33333')
        const expected = 'ZmVsbGlwZS51c2VyOjEyMzIxMw=='
        expect( actual ).not.toBe( expected) 
    })
})