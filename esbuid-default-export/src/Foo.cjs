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
