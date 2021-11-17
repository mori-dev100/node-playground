export class User {
  /**
   * @param name {string} 名前
   * @param email {stirng} メールアドレス
   */
  constructor(name, email) {
    if (name.length > 50) {
      throw new Error("51文字以上の名前はつけられません");
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // これはデモです
    if (!emailRegex.test(email)) {
      throw new Error("メールアドレスのフォーマットにしたがっていません");
    }

    this.name = name;
    this.email = email;
  }

  toJson() {
    return {
      name: this.name,
      email: this.email,
    };
  }
}
