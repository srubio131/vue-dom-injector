import DOMInjector from "../src/DOMInjector";

const $domInjector = new DOMInjector();
const scriptString = `
    <script id="my-script">
        alert('Hi!')
    <\/script>
`;

describe("Private methods", () => {
  let node = null;

  beforeEach(() => {
    node = document.createElement("script");
  });

  describe("_addExtraAttrsToNode()", () => {
    test("Add extra attrs without extra atts to html node", () => {
      $domInjector._addExtraAttrsToNode(node);
      expect(node.attributes.length).toBe(0);
    });
    test("Add extra attrs to html node", () => {
      node = $domInjector._addExtraAttrsToNode(node, {
        type: "text/javascript",
      });
      expect(node.attributes.length).toBe(1);
      expect(node.type).toBe("text/javascript");
    });
  });

  describe("_createNode()", () => {
    test("Create new node from string and without attrs", () => {
      const newNode = $domInjector._createNode(scriptString);
      expect(newNode).not.toBeNull();
    });

    test("Create new node from string and with attrs", () => {
      const newNode = $domInjector._createNode(scriptString, {
        type: "text/javascript",
      });
      expect(newNode).not.toBeNull();
      expect(newNode.attributes.length).toBe(2);
    });
  });
});

describe("Public methods", () => {
  describe("injectNode()", () => {
    test("inject node without parameters (error)", () => {
      expect.assertions(1);
      return $domInjector.injectNode().catch((e) => {
        expect(e).toMatch("To inject a node it's necessary to indicate a tag");
      });
    });
    test("inject node without parameters (defaults)", () => {
      return $domInjector.injectNode(scriptString).then((node) => {
        const injectedNode = document.querySelector("#my-script");
        expect(injectedNode).toBeTruthy();
        expect(injectedNode.id).toBe("my-script");
        expect(injectedNode.parentElement).toMatchObject(document.head);
        expect(node).toMatchObject(injectedNode);
      });
    });
    test("inject node with custom parameters", () => {
      const parent = document.createElement("div");
      parent.id = "test";
      document.body.appendChild(parent);

      const params = {
        parentTag: "#test",
        insertAsLastTag: false,
        extraAttrs: {
          id: "test-2",
          type: "text/javascript",
        },
      };
      return $domInjector.injectNode(scriptString, params).then((node) => {
        const injectedNode = document.querySelector("#test-2");
        expect(injectedNode).toBeTruthy();
        expect(injectedNode.id).toBe("test-2");
        expect(injectedNode.type).toBe("text/javascript");
        expect(node).toMatchObject(injectedNode);
      });
    });
    test("no inject node if already exists", () => {
      const testScript = `
          <script id="test-script">
              alert('Hi!')
          <\/script>
      `;
      return $domInjector.injectNode(testScript).then(() => {
        $domInjector.injectNode(testScript).then((node) => {
          const injectedNodes = document.head.querySelectorAll("#test-script");
          expect(injectedNodes.length).toBe(1);
          const injectedNode = injectedNodes[0];
          expect(injectedNode).toBeTruthy();
          expect(injectedNode.id).toBe("test-script");
          expect(injectedNode.parentElement).toMatchObject(document.head);
          expect(node).toMatchObject(injectedNode);
        });
      });
    });
    test.skip("inject node if already exists but not equals", () => {
      const testScript1 = `
          <script id="test-script">
              alert('Hi!')
          <\/script>
      `;
      const testScript2 = `
          <script id="test-script" class="p-10">
              alert('Bye!')
          <\/script>
      `;
      return $domInjector.injectNode(testScript1).then(() => {
        $domInjector.injectNode(testScript2).then((node) => {
          const injectedNodes = document.head.querySelectorAll("script");
          expect(injectedNodes.length).toBe(2);
          const injectedNode = injectedNodes[0];
          expect(injectedNode).toBeTruthy();
          expect(injectedNode.id).toBe("test-script");
          expect(injectedNode.parentElement).toMatchObject(document.head);
          expect(node).toMatchObject(injectedNode);
        });
      });
    }, 10000);
  });

  describe("removeNode()", () => {
    let parent = null;

    beforeEach(() => {
      parent = document.createElement("div");
      parent.id = "test";
      parent.setAttribute("my-attr", 10);
      document.body.appendChild(parent);
    });

    test("remove node by id (succesfully)", () => {
      return $domInjector.removeNode("#test").then(() => {
        setTimeout(() => {
          // Wait to document refresh
          expect(document.querySelector("#test")).toBeNull();
        }, 1000);
      });
    });
    test("remove node by element and attrs (succesfully)", () => {
      return $domInjector.removeNode("div[my-attr]").then(() => {
        setTimeout(() => {
          // Wait to document refresh
          expect(document.querySelector("#test")).toBeNull();
        }, 1000);
      });
    });
    test("remove node (error)", () => {
      expect.assertions(1);
      return $domInjector.removeNode().catch((e) => {
        expect(e).toMatch(
          "To delete a node it's necessary to indicate a selector"
        );
      });
    });
  });

  describe("removeAllNode()", () => {
    const tagSelector = "div[my-attr='10']";
    let parent = null;
    let parent2 = null;

    beforeEach(() => {
      parent = document.createElement("div");
      parent.setAttribute("my-attr", 10);
      parent2 = document.createElement("div");
      parent2.setAttribute("my-attr", 10);
      document.body.appendChild(parent);
      document.body.appendChild(parent2);
    });

    test("remove all nodes by selector (succesfully)", () => {
      return $domInjector.removeAllNodes(tagSelector).then(() => {
        setTimeout(() => {
          // Wait to document refresh
          expect(document.querySelectorAll(tagSelector)).toBeNull();
        }, 1000);
      });
    });
  });
});
