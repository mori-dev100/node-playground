const { Client, Pool } = require("pg");

(async () => {
  const client = new Client({
    user: "pguser",
    host: "postgres",
    database: "db",
    password: "postgres",
  });
  await client.connect();
  const res = await client.query(`select 1 + 1 `);
  console.log(res);
  await client.end();
})();
