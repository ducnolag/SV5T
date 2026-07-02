const { MongoClient } = require('mongodb');

// Connect to local native MongoDB instance on port 27017 without auth since we started it manually
const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB native instance");
    const db = client.db("sv5t_logs");

    // Create collections
    await db.createCollection("audit_logs");
    await db.createCollection("ocr_results");
    await db.createCollection("chatbot_conversations");
    await db.createCollection("notifications");

    // Create Indexes
    await db.collection("audit_logs").createIndex({ user_id: 1 });
    await db.collection("audit_logs").createIndex({ timestamp: -1 });

    await db.collection("ocr_results").createIndex({ proof_id: 1 });

    await db.collection("chatbot_conversations").createIndex({ user_id: 1 });
    await db.collection("chatbot_conversations").createIndex({ created_at: -1 });

    await db.collection("notifications").createIndex({ user_id: 1 });
    await db.collection("notifications").createIndex({ is_read: 1 });
    await db.collection("notifications").createIndex({ created_at: -1 });

    console.log("MongoDB collections and indexes created.");

    // Seed dummy audit log for test
    await db.collection("audit_logs").insertOne({
        user_id: "system",
        action: "INITIALIZE_DB",
        entity_type: "SYSTEM",
        entity_id: "sv5t",
        old_data: null,
        new_data: { initialized: true },
        ip_address: "127.0.0.1",
        timestamp: new Date()
    });

    console.log("MongoDB dummy seed completed.");

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
