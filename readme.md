# plugincomb

## overview
> 定义了一种插件。  
> 每种插件支持：  
    > 注册钩子及对应的方法  
    > 调用钩子对应的方法  
    > 注销钩子上所有的方法或指定的方法  
> 它与tapable是竞品关系  

### feature
- feature0
- feature1
- feature2

## install
`npm i plugincomb`

## usage
```js
import {syncPlugin} from 'plugincomb';
// 定义方法
let fn1 = (...a) => {
    console.log('fn1 params', ...a)
}
let fn2 = (...a) => {
    console.log('fn2 params', ...a)
}
// 注册钩子，并添加方法
syncPlugin.register('hookName', fn1)
syncPlugin.register('hookName', fn2)
console.log('syncPlugin', syncPlugin._hookMap.get('hookName'))
// syncPlugin.register('hookName1', fn) // 可以创建多个钩子
// 调用钩子
syncPlugin.call('hookName', 'a', 'b')   // 调用指定的钩子。会依次、同步执行该钩子上的所有方法。
// 注销钩子上的指定方法
// syncPlugin.logout('hookName', fn1)      // 注销hookName钩子上的fn1方法
// 注销钩子上的所有方法
syncPlugin.logout('hookName')           // 注销hookName钩子
syncPlugin.call('hookName', 'a', 'b')   // 验证是否会执行hook
console.log('syncPlugin', syncPlugin._hookMap.get('hookName'))
```

### 串行
```js
let seriesPlugin = new SeriesPlugin({
    method: "bail"
    // method: "waterFall"
})
```

### 并行
```js
let ParallelPlugin = new ParallelPlugin({
    method: "all",
    // method: "allSettled",
})
```



## api
```js
plugincomb: {
    syncPlugin,
    // asyncPlugin,
    // parallelPlugin,
    // flowLinePlugin,
    // bailPlugin,
    // ...
}
// 注册钩子
// 若钩子已经存在则为其添加方法
// 否则创建新钩子并为其添加方法
syncPlugin.register(hookName: any, fn: function)
// 调用钩子
// 会根据添加注册的顺序依次执行各方法
syncPlugin.call(hookName: any)
// 注销钩子或钩子上的指定方法
syncPlugin.logout(hookName: any, fn?: function)
```

## principle
hook包  
缓存hookName对应的方法  
register(fn)  
call(...p)  
logout(fn?)  

各种plugin  
实例化一个Hooks类。在该实例上缓存方法。  
在plugin实例的_hookMap属性上设置hookName对应的Hooks实例。  
register(hookName, fn)  
call(hookName, ...p)  
logout(hookName, fn?)  

index.js  
输出各plugin的实例

### uml
```
          hook -------------> plugin ---------> index.js
        缓存钩子对应的方法     (BasicPlugin)       统一输出实例
                            (SyncPlugin)
                            (AsyncPlugin)
                            (...Plugin)
```

## 本地运行
1. git clone xxxx  
2. 安装依赖。需要全局安装rollup  
3. 打包 npm run r  
4. 测试 npm run t  
## 灵活 & 危险
method属性是放在原型对象上的。  
不提供改变此属性的方法，也不冻结此属性。  
不冻结会有危险的极端情况。由使用者解决该极端情况。  
该包提供了一个工作方法`basicPlugin.freeseMethod()`可以冻结。需要手动调用。  



## todo
> 完善其他插件  
    > 串行          sericsPlugin
    并行            parallelAllPlugin
    流水线行        parallelAllSettledPlugin
    promise         bailPlugin
> 引入jest,并测试。使用bdd+tdd。  
> 使用ts重写
