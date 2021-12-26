"use strict";

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let fakeUsers = [];
    const fakeUserCreatedAmount = 5;
    for (var i = 0; i < fakeUserCreatedAmount; i++) {
      fakeUsers.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const latestUserId = await queryInterface.bulkInsert("Users", fakeUsers);
    const chatroomId = await queryInterface.bulkInsert("Chatrooms", [
      {
        title: "sample room",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    let chatMembers = [];
    const mockSzie = 5;
    for (var i = latestUserId; i > latestUserId - mockSzie; i--) {
      chatMembers.push({
        userId: i,
        chatroomId: chatroomId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("ChatMembers", chatMembers);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
