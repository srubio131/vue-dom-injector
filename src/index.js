import DOMInjector from './DOMInjector'

export default {
    install: (app, { name = 'domInjector' } = {}) => {
        if ('prototype' in app) {
            // Vue2
            Object.defineProperty(app.prototype, `$${name}`, { value: new DOMInjector() })
        } else {
            // Vue3
            app.config.globalProperties[`$${name}`] = new DOMInjector()
        }
    }
}