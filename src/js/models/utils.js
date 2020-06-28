module.exports = {

    exec(key, val) {
        return document.execCommand(key, false, val)
    },

    queryCommandState(type) {
        return document.queryCommandState(type)
    },

    querySelector(selector) {
        return document.querySelector(selector)
    },

    createElement(selector) {
        return document.createElement(selector)
    },

    addEventListener(node, type, fn) {
        return node.addEventListener(type, fn)
    }
}