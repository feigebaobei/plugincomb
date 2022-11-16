import {
    SyncPlugin
} from "../dist_esm/index.js";
// console.log('test', SyncPlugin)



let syncPlugin = new SyncPlugin()
let fn1 = (...a) => {
    console.log('fn1 params', ...a)
}
let fn2 = (...a) => {
    console.log('fn2 params', ...a)
}
syncPlugin.register('hookName', fn1)
syncPlugin.register('hookName', fn2)
console.log('syncPlugin', syncPlugin._hookMap.get('hookName'))
// syncPlugin.register('hookName1', fn) // 可以创建多个钩子
syncPlugin.call('hookName', 'a', 'b')   // 调用指定的钩子。会依次、同步执行该钩子上的所有方法。
// syncPlugin.logout('hookName', fn1)      // 注销hookName钩子上的fn1方法
syncPlugin.logout('hookName')           // 注销hookName钩子上的所有方法
syncPlugin.call('hookName', 'a', 'b')   // 验证是否会执行hook
console.log('syncPlugin', syncPlugin._hookMap.get('hookName'))


