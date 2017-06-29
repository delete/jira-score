const utils = require('../src/utils')

test('base4 of admin:pass must be YWRtaW46cGFzcw==', () => {
    const actual = 'admin:pass'
    const expected = 'YWRtaW46cGFzcw=='
    
    const result = utils.toBase64(actual)
    expect(result).toBe(expected);
});
