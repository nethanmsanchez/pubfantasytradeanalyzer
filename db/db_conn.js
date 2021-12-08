// db_conn.js
// FantasyTradeAnalyzer
// Nethan S
// This file creates the MongoDb connection.



const { MongoClient } = require("mongodb");
const Db = process.env.DB_URI;
const client = new MongoClient(Db);
var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("fantasy_stats");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    },
};
