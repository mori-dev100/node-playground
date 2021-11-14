'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ChatMember.init({
    userId: DataTypes.INTEGER,
    chatroomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatMember',
  });
  return ChatMember;
};