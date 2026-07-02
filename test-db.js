const { MongoClient } = require('mongodb');
async function run() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('applications');
  const qc = await db.collection('quy_che').find().toArray();
  console.dir(qc, { depth: null });
  const hoSo = await db.collection('ho_so').find().toArray();
  console.dir(hoSo, { depth: null });
  await client.close();
}
run().catch(console.error);
