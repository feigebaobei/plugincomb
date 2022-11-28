// 与hooks相同，只是使用esm规范测试。
// 'use strict';
// const Hooks = require('../src/hooks.js')
import Hooks from '../src/hooks.js'
// constructor
// register
// getRegistrant
// logout
// size

let hook = new Hooks()
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
    expect(hook).toEqual({_box: new Map()})
    hook.register(fn0)
    hook.register(fn1)
    hook.register(fn2)
    hook.register(fn3)
    hook.register(fn4)
    // hook.register
    // hook.getRegistrant
    // hook.logout
    // hook.size
    expect(hook.getRegistrant()).toContain(fn2)
    hook.logout(fn1)
    hook.logout(fn2)
    expect(hook.getRegistrant()).not.toContain(fn1)
    expect(hook.getRegistrant()).not.toContain(fn2)
    expect(hook.getRegistrant()).toContain(fn0)
    hook.logout()
    expect(hook.getRegistrant()).not.toContain(fn4)
    expect(hook.size()).toBe(0)
})

