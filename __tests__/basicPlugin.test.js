'use strict';

const BasicPlugin = require('../dist_cjs/basicPlugin.js')
let basicPlugin = new BasicPlugin()
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
test('a', () => {
    expect(basicPlugin).toEqual({_hookMap: new Map()})
    expect(basicPlugin._getHook('fh')).toBeFalsy()
    basicPlugin.register('fh', fn0)
    basicPlugin.register('fh', fn1)
    basicPlugin.register('fh', fn2)
    basicPlugin.register('fh', fn3)
    basicPlugin.register('fh', fn4)
    expect(basicPlugin._getHook('fh')).toBeTruthy()
    expect(basicPlugin.getAllHookName().length).toBe(1)
    expect(basicPlugin.getAllHookName()).toContain('fh')
    expect(basicPlugin.hasRegistedHook('fh')).toBeTruthy()
    expect(basicPlugin.hasRegistedHook('fh1')).toBeFalsy()
    basicPlugin.logout('fh', fn1)
    basicPlugin.logout('fh', fn2)
    expect(basicPlugin.getRegistrant('fh')).not.toContain(fn1)
    expect(basicPlugin.getRegistrant('fh')).toContain(fn3)
    basicPlugin.clear()
    expect(basicPlugin.getAllHookName().length).toBe(0)
})

