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
