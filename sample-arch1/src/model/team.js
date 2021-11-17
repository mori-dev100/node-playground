export class Team {
  /**
   * @param creatdUserId {string} 名前
   */
  constructor(cretedUserId) {
    this.createdUserId =cretedUserId
  }

  toJson() {
    return {
      userId: this.createdUserId
    };
  }
}
