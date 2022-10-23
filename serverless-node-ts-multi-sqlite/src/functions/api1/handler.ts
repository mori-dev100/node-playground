import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import knex from "knex";
const db = knex({
  client: "sqlite",
  connection: {
    filename: "./sample.sqlite",
  },
});

const getHandler = async (event) => {
  const result = await kenx("sample").limit(10);
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
    result,
  });
};

export const get = middyfy(getHandler);
