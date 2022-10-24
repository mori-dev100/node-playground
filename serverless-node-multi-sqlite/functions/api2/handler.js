"use strict";

const knex = require("knex")({
  client: "better-sqlite3",
  connection: {
    filename: "./functions/api2/database2.sqlite",
  },
});

module.exports.get = async (event) => {
  const result = await knex("sample").limit(100);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
        data: result,
      },
      null,
      2
    ),
  };
};
