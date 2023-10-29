# esbuildでexportされたclassをビルドするテスト

前提とするmjs, cjsのファイルはこの２つ
``` js
// Hoge.mjs
export default class Hoge {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log("Hoge", this.name);
  }
}

export class Fuga {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log("Fuga", this.name);
  }
}
```

``` js
exports.default = class Foo {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log("Foo", this.name);
  }
};

exports.Bar = class Bar {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log("Bar", this.name);
  }
};
```


# 実行パターン

## mjs + named export

``` javascript
// index1.mjs
import { Fuga } from "./Hoge.mjs";

const fuga = new Fuga(":sushi:");
fuga.sayName();


// npx esbuild src/index1.mjs --bundle
(() => {
  // src/Hoge.mjs
  var Fuga = class {
    constructor(name) {
      this.name = name;
    }
    sayName() {
      console.log("Fuga", this.name);
    }
  };

  // src/index1.mjs
  var fuga = new Fuga(":sushi:");
  fuga.sayName();
})();
```

``` shell
$ npx esbuild src/index1.mjs --bundle | node
Fuga :sushi:
```


## mjs + default export

``` javascript
// index2.mjs
import Hoge from "./Hoge.mjs";

const hoge = new Hoge(":sushi:");
hoge.sayName();



// npx esbuild src/index2.mjs --bundle
(() => {
  // src/Hoge.mjs
  var Hoge = class {
    constructor(name) {
      this.name = name;
    }
    sayName() {
      console.log("Hoge", this.name);
    }
  };

  // src/index2.mjs
  var hoge = new Hoge(":sushi:");
  hoge.sayName();
})();
```

``` shell
$ npx esbuild src/index2.mjs --bundle | node
Hoge :sushi:
```

## cjs + named export

``` javascript
// index3.mjs
import { Bar } from "./Foo.cjs";

const bar = new Bar(":sushi:");
bar.sayName();


// npx esbuild src/index3.mjs --bundle
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/Foo.cjs
  var require_Foo = __commonJS({
    "src/Foo.cjs"(exports) {
      exports.default = class Foo {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Foo", this.name);
        }
      };
      exports.Bar = class Bar {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Bar", this.name);
        }
      };
    }
  });

  // src/index3.mjs
  var import_Foo = __toESM(require_Foo(), 1);
  var bar = new import_Foo.Bar(":sushi:");
  bar.sayName();
})();
```

``` shell
$ npx esbuild src/index3.mjs --bundle | node
Bar :sushi:
```

## cjs + default export

``` javascript
// index4.mjs
import Foo from "./Foo.cjs";

const foo = new Foo(":sushi:");
foo.sayName();


// npx esbuild src/index4.mjs --bundle
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/Foo.cjs
  var require_Foo = __commonJS({
    "src/Foo.cjs"(exports) {
      exports.default = class Foo {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Foo", this.name);
        }
      };
      exports.Bar = class Bar {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Bar", this.name);
        }
      };
    }
  });

  // src/index4.mjs
  var import_Foo = __toESM(require_Foo(), 1);
  var foo = new import_Foo.default(":sushi:");
  foo.sayName();
})();
```

``` shell
$ npx esbuild src/index4.mjs --bundle | node
[stdin]:52
  var foo = new import_Foo.default(":sushi:");
            ^

TypeError: import_Foo.default is not a constructor
    at [stdin]:52:13
    at [stdin]:54:3
    at Script.runInThisContext (node:vm:129:12)
    at Object.runInThisContext (node:vm:313:38)
    at node:internal/process/execution:79:19
    at [stdin]-wrapper:6:22
    at evalScript (node:internal/process/execution:78:60)
    at node:internal/main/eval_stdin:29:5
    at Socket.<anonymous> (node:internal/process/execution:195:5)
    at Socket.emit (node:events:525:35)
```


## cjs + default export + namespace import

``` js
// index5.mjs
import * as Foo from "./Foo.cjs";

const foo = new Foo(":sushi:");
foo.sayName();


// npx esbuild src/index5.mjs --bundle
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/Foo.cjs
  var require_Foo = __commonJS({
    "src/Foo.cjs"(exports) {
      exports.default = class Foo {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Foo", this.name);
        }
      };
      exports.Bar = class Bar {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Bar", this.name);
        }
      };
    }
  });

  // src/index5.mjs
  var Foo = __toESM(require_Foo(), 1);
  var foo = new Foo(":sushi:");
  foo.sayName();
})();
```

```shell
npx esbuild src/index5.mjs --bundle | node
▲ [WARNING] Constructing "Foo" will crash at run-time because it's an import namespace object, not a constructor [call-import-namespace]

    src/index5.mjs:3:16:
      3 │ const foo = new Foo(":sushi:");
        ╵                 ~~~

  Consider changing "Foo" to a default import instead:

    src/index5.mjs:1:7:
      1 │ import * as Foo from "./Foo.cjs";
        │        ~~~~~~~~
        ╵        Foo

1 warning
[stdin]:52
  var foo = new Foo(":sushi:");
            ^

TypeError: Foo is not a constructor
    at [stdin]:52:13
    at [stdin]:54:3
    at Script.runInThisContext (node:vm:129:12)
    at Object.runInThisContext (node:vm:313:38)
    at node:internal/process/execution:79:19
    at [stdin]-wrapper:6:22
    at evalScript (node:internal/process/execution:78:60)
    at node:internal/main/eval_stdin:29:5
    at Socket.<anonymous> (node:internal/process/execution:195:5)
    at Socket.emit (node:events:525:35)
```


## cjs + default export + オレオレnamespace import


``` js
// index6.mjs
import { default as FooNamespace } from "./Foo.cjs";

const { default: Foo } = FooNamespace;
const foo = new Foo(":sushi:");
foo.sayName();


// npx esbuild ./src/index6.mjs --bundle
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/Foo.cjs
  var require_Foo = __commonJS({
    "src/Foo.cjs"(exports) {
      exports.default = class Foo {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Foo", this.name);
        }
      };
      exports.Bar = class Bar {
        constructor(name) {
          this.name = name;
        }
        sayName() {
          console.log("Bar", this.name);
        }
      };
    }
  });

  // src/index6.mjs
  var import_Foo = __toESM(require_Foo(), 1);
  var { default: Foo } = import_Foo.default;
  var foo = new Foo(":sushi:");
  foo.sayName();
})();
```

``` shell
$ npx esbuild src/index6.mjs --bundle | node
Foo :sushi:
```
