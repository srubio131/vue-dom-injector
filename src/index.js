import DOMInjector from "./DOMInjector";

export default {
  install: (app, { name = "domInjector" } = {}) => {
    const isVue2 = "prototype" in app;
    const prototype = isVue2 ? app.prototype : app.config.globalProperties;

    Object.defineProperty(prototype, `$${name}`, {
      value: new DOMInjector(),
    });
  },
};
