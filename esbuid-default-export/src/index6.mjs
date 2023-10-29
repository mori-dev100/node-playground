import { default as FooNamespace } from "./Foo.cjs";

const { default: Foo } = FooNamespace;
const foo = new Foo(":sushi:");
foo.sayName();
