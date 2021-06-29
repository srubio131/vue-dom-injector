export default class NodeInjector {

    constructor ({ extraAttrs = {}, parentElement = 'head', insertAsLastElement = true }) {
        this.extraAttrs = extraAttrs
        this.parentElement = parentElement
        this.insertAsLastElement = insertAsLastElement
    }

    injectNode (tag, {
        extraAttrs = this.extraAttrs,
        parentElement = this.parentElement,
        insertAsLastElement = this.insertAsLastElement 
    }) {
        return new Promise((resolve, reject) => {
            try {
                const node = this._createNode(tag, extraAttrs)
                const element = document.querySelector(parentElement)
                if (insertAsLastElement) element.appendChild(node)
                else element.prepend(node)
                resolve(node)
            } catch (e) {
                reject(new Error('No se ha podido inyectar el script correctamente'))
            }
        })
    }

    _createNode (elementAsString = '', extraAttrs = []) {
        const elementNameMatched = elementAsString.match(/(\/(\w|\s)*)/ig)
        const tagName = elementNameMatched[elementNameMatched.length - 1].slice(1) // TODO. Find better way to get the name of the tag
        const tagText = elementAsString.replace(/(<([^>]+)>)/ig, '')
        let node = document.createElement(tagName)
        node.text = tagText
        node = this._addExtraAttrsToNode(node, extraAttrs)
        return node
    }

    _addExtraAttrsToNode (node, extraAttrs = []) {
        const extraAttrsKeys = Object.keys(extraAttrs)
        if (extraAttrsKeys.length) {
            extraAttrsKeys.forEach((extraAttrsKey) => {
                node.setAttribute(extraAttrsKey, extraAttrs[extraAttrsKey])
            })
        }
        return node
    }
}
