import NodeInjector from './NodeInjector'

const DEFAULT_OPTIONS = {
    name: 'scriptLoader',
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
        Object.defineProperty(app.prototype, `$${options.name}`, { value: new NodeInjector(options) })
    }
}