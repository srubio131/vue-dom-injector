import DOMInjector from './DOMInjector'

export default {
    install: (app, { name = 'domInjector' } = {}) => {
        Object.defineProperty(app.prototype, `$${name}`, { value: new DOMInjector() })
    }
}