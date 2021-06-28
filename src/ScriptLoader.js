const SCRIPT_TAG = '<script>'

export default class ScriptLoader {

    constructor ({ extraAttrs = {}, parentElement = 'head', insertAsLastElement = true }) {
        this.extraAttrs = extraAttrs
        this.parentElement = parentElement
        this.insertAsLastElement = insertAsLastElement
    }

    /**
    * Inject script into DOM parentElement
    *
    * @returns {void}
    * @public
    */
    injectScript = ({
        script,
        extraAttrs = this.extraAttrs,
        parentElement = this.parentElement,
        insertAsLastElement = this.insertAsLastElement 
    }) => {
        return new Promise((resolve, reject) => {
            try {
                let transformedScript = script
                const extraAttrsKeys = Object.keys(extraAttrs)
                if (extraAttrsKeys.length) {
                    const newAttrs = extraAttrsKeys.map(key => `${key}=${extraAttrs[key]}`).join(' ')
                    transformedScript = script.slice(0, SCRIPT_TAG.length - 1) + " " + newAttrs + script.slice(SCRIPT_TAG.length - 1)
                }

                const applyFunc = (insertAsLastElement) ? 'appendChild' : 'prepend'
                document.querySelector(parentElement)[applyFunc](transformedScript)
                resolve()
            } catch (e) {
                reject()
            }
        })
    }
}
