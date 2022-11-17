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
```

## api
```js
plugincomb: {
    SyncPlugin,
    // AsyncPlugin,
    // ParallelPlugin,
    // FlowLinePlugin,
    // ...
}
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
        缓存钩子对应的方法     (basicPlugin)       统一输出实例
                            (SyncPlugin)
                            (AsyncPlugin)
                            (...Plugin)
```

## 本地运行
1. git clone xxxx  
2. 需要全局安装rollup  
3. npm run r  
4. npm rum t  

## todo
> 完善其他插件  
> package.json中的引入输出key  
> 抽象出basicPlugin  