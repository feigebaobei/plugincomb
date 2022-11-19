// 考虑把它移到 __tests__ 目录
// 要使用JEST，前端必须要以模块形式暴露，即module.exports
let plugins = require('./dist_cjs/index')
let syncPlugin = plugins.syncPlugin


test('should first', () => {
    // expect(syncPlugin).toEqual({"_hookMap": {}})
    // let a = {_hookMap: new Map()}
    // expect(syncPlugin).toEqual(a)
    expect(syncPlugin).toEqual({_hookMap: new Map()})
    // expect(syncPlugin.has('_hookMap')).toEqual(true)
})