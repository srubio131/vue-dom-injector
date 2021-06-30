import DOMInjector from './DOMInjector'

export default {
    install: (app, { name = 'domInjector' } = {}) => {
        app.config.globalProperties[`$${name}`] = new DOMInjector()
    }
}