// db.js
const { MongoClient } = require("mongodb");

const uri = process.env.url;
const dbName = process.env.Database_Name;

let client;
let db;

async function connectToMongo() {
    if (db) return db;

    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log("✅ MongoDB connected");
    return db;
}

async function getDB() {
    if (!db) {
        await connectToMongo();
    }
    return db;
}

async function getCollection(collectionName) {
    const database = await getDB();
    return database.collection(collectionName);
}

async function closeConn() {
    await client.close();
}
module.exports = {
    connectToMongo,
    getDB,
    getCollection,
    closeConn
};