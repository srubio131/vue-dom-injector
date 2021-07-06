const DEFAULT_OPTIONS = {
  extraAttrs: {},
  parentTag: "head",
  insertAsLastTag: true,
};
const REMOVE_METHODS = {
  SINGLE: "single",
  ALL: "all",
};

export default class DOMInjector {
  constructor() {}

  injectNode(
    tag,
    {
      parentTag = DEFAULT_OPTIONS.parentTag,
      insertAsLastTag = DEFAULT_OPTIONS.insertAsLastTag,
      extraAttrs = DEFAULT_OPTIONS.extraAttrs,
    } = {}
  ) {
    return new Promise((resolve, reject) => {
      try {
        const node = this._createNode(tag, extraAttrs);
        const parentTagNode = document.querySelector(parentTag);
        if (insertAsLastTag) parentTagNode.appendChild(node);
        else parentTagNode.prepend(node);
        resolve(node);
      } catch (e) {
        reject(new Error("The script could not be injected succesfully"));
      }
    });
  }

  removeAllNodes(tagSelector) {
    return this._deleteNode(tagSelector, REMOVE_METHODS.ALL);
  }

  removeNode(tagSelector) {
    return this._deleteNode(tagSelector, REMOVE_METHODS.SINGLE);
  }

  _deleteNode(tagSelector, method) {
    const applyFunc = {
      [REMOVE_METHODS.SINGLE]: (tag) => [document.querySelector(tag)],
      [REMOVE_METHODS.ALL]: (tag) => document.querySelectorAll(tag),
    };
    return new Promise((resolve, reject) => {
      if (!tagSelector) {
        reject("To delete a node it's necessary to indicate a selector");
      }

      try {
        const tags = Array.from(applyFunc[method](tagSelector));

        if (tags.every((tag) => tag !== null)) {
          tags.forEach((tag) => {
            tag.parentNode.removeChild(tag);
          });
        }
        resolve();
      } catch (e) {
        reject("An error occurred while deleting the node: " + e);
      }
    });
  }

  _createNode(tagAsString, extraAttrs) {
    const parsedTag = document
      .createRange()
      .createContextualFragment(tagAsString);
    let node = parsedTag.firstElementChild;
    node = this._addExtraAttrsToNode(node, extraAttrs);
    return node;
  }

  _addExtraAttrsToNode(node, extraAttrs = {}) {
    const extraAttrsKeys = Object.keys(extraAttrs);
    if (extraAttrsKeys.length) {
      extraAttrsKeys.forEach((extraAttrsKey) => {
        node.setAttribute(extraAttrsKey, extraAttrs[extraAttrsKey]);
      });
    }
    return node;
  }
}
