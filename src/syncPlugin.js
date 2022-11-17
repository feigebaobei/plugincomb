import BasicPlugin from "./basicPlugin";
import Hooks from "./hooks";
class SyncPlugin extends BasicPlugin{
    constructor() {
        super()
        // this._hook = new Hooks()
        this._hookMap = new Map()
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
    // 得到所有已经注册的hook
    // getRegistedHook(hookName) {
    // 根据hookName得到hook
    getHook(hookName) {
        if (hookName) {
            return this._hookMap.get(hookName)
        } else {
            return null
        }
        return Array.from(this._hookMap.keys())
    }

    call(hookName, ...p) {
        this._hookMap.get(hookName) // hook
            .call(...p)
    }
    // 注销钩子
    logoutHook(hookName) {
        this._hookMap.delete(hookName)
    }
    // 注销钩子上的方法
    logoutHookFn(hookName, fn) {
        this._hookMap.get(hookName) // hook
            .logout(fn)
    }
    // 先做成可以注销一个方法的
    // todo fix
    logout(hookName, fn) {
        if (this._hookMap.has(hookName)) {
            if (fn) {
                this._hookMap.get(hookName).logout(fn)
            } else {
                this._hookMap.get(hookName).logout()
            }
        }
    }
}
export default SyncPlugin