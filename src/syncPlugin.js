// 考虑把它移到 __tests__ 目录
import BasicPlugin from "./basicPlugin";
import Hooks from "./hooks";
class SyncPlugin extends BasicPlugin{
    constructor() {
        super()
        this._hookMap = new Map()
        // {
        //     'str': hook
        // }
    }
    register(hookName, fn) {
        // 是否存在指定hookName的钩子
        // 若存在则在该钩子上注册方法。
        // 否则创建新的钩子。为其添加方法
        let hook = this.getHook(hookName)
        if (hook) {
            hook.register(fn)
        } else {
            hook = new Hooks()
            hook.register(fn)
            this._hookMap.set(hookName, hook)
        }
    }
    // 是否存在指定hookName的钩子
    hasRegistedHook(hookName) {
        return this._hookMap.has(hookName)
    }
    // 得到所有已经注册的hook | undefined
    getHook(hookName) {
        return this._hookMap.get(hookName)
    }
    // 执行钩子上的所有方法
    call(hookName, ...p) {

        let hook = this.getHook(hookName)
        if (hook) {
            hook.getRegistrant() // [fn, ...]
                .forEach(fn => {
                    fn(...p)
                })
        }
    }
    // 注销钩子或钩子上的指定方法
    logout(hookName, fn) {
        let hook = this.getHook(hookName)
        if (hook) {
            if (fn) {
                hook.logout(fn)
            } else {
                this._hookMap.delete(hookName)
            }
        }
    }
}
export default SyncPlugin