'use strict';

const {syncPlugin} = require('../dist_cjs/index.js')
// let basicPlugin = new BasicPlugin()
// constructor
// _getHook
// register
// hasRegistedHook
// logout
// clear
// getAllHookName
// getRegistrant



// let hook = new Hooks()
let clog = console.log

let fn0 = (a) => {
    clog('fn0', a)
}
let fn1 = (a) => {
    clog('fn1', a)
}
let fn2 = (a) => {
    clog('fn2', a)
}
let fn3 = (a) => {
    clog('fn3', a)
}
let fn4 = (a) => {
    clog('fn4', a)
}

let mockFn0 = jest.fn((a, b, c, d, e) => {
    clog(a, b, c, d, e)
})
let mockFn1 = jest.fn((a, b, c, d) => {
    clog(a, b, c, d)
})
let mockFn2 = jest.fn((a, b, c) => {
    clog(a, b, c)
})

syncPlugin.register('fh', mockFn0)
syncPlugin.register('fh', mockFn1)
syncPlugin.register('fh', mockFn2)
syncPlugin.call('fh', 1,2,3)

test('a', () => {
    expect(mockFn0.mock.calls.length).toBe(1)
    expect(mockFn1.mock.calls.length).toBe(1)
    expect(mockFn2.mock.calls.length).toBe(1)
    expect(mockFn1.mock.calls[0][0]).toBe(1)
    expect(mockFn2.mock.calls[0][1]).toBe(2)
    expect(mockFn0.mock.calls[0][2]).toBe(3)
    expect(mockFn0.mock.calls[0][3]).toBeUndefined()
})

