"use strict";

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
    let fakeChatMember = [];
    // const allUsers = await Sequelize.Users.findAll();
    // const firstChatroom = await Sequelize.ChatRoom.findOne();

    allUsers.slice(0, 3).forEach((user) => {
      fakeChatMember.push({
        userId: user.id,
        chatroomId: firstChatroom.id,
        createdAt: new Date(),
        udpatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("ChatMembers", fakeChatMember);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Chatmembers", null);
  },
};
