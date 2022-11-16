'use strict';

class Hooks {
    constructor() {
        this._box = new Map();
    }
    register(fn) {
        this._box.set(fn, Symbol());
    }
    call(...params) {
        Array.from(this._box.keys()).forEach(fn => {
            fn(...params);
        });
    }
    logout(fn) {
        if (fn) {
            this._box.delete(fn);
        } else {
            this._box = new Map();
        }
    }
}

module.exports = Hooks;
//# sourceMappingURL=hooks.js.map
