const DEFAULT_OPTIONS = {
    name: 'scriptLoader',
    script: '',
    extraAttrs: {},
    parentElement: 'head',
    insertAsLastElement: true,
}


export default {
    install: (app, customOptions) => {
        const options = {
            ...DEFAULT_OPTIONS,
            ...customOptions,
        }
        app.prototype[`$${options.name}`] = new ScriptLoader(options)
    }
}