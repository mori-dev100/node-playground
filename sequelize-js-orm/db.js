import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  Storage: "database.sqlite",
});
