const { Client } = require('pg');
async function run() {
  const client = new Client({
    connectionString: "postgresql://postgres:%40Duclag123@localhost:5432/sv5t_db?schema=public"
  });
  await client.connect();
  const res = await client.query('SELECT * FROM "TieuChi"');
  console.log(res.rows);
  await client.end();
}
run().catch(console.error);
