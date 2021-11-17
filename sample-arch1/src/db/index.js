import knex from "knex";

import { development, production, staging } from "../../knexfile";

let conf = {};
if (process.env.NODE_ENV === "production") {
  conf = production;
} else {
  conf = development;
}
export default knex(conf);
