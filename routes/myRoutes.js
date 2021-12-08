// myRoutes.js
// FantasyTradeAnalyzer
// Nethan S
// This file contains my express server api routes.



const express = require("express");
// this is an instance of the express router. It will be added as a middleware and will take control of requests starting with /record
const router = express.Router();
const dbo = require("../db/db_conn");

// This route will get a player by the player name.
router.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("fantasy_stats"); // may need to change this to fantasy_stats
    let query = { name: req.query[0] };
    db_connect.collection("half_ppr_stats").findOne(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// This route will get all of the players names.
router.route("/names").get(function (req, res) {
    console.log("heyeyuefhag");
    let db_connect = dbo.getDb("fantasy_stats");
    let query = { book: "mark" }; // may need to change this to something else. trying to get any entry with names field (should just be 1)
    db_connect.collection("half_ppr_stats").findOne(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

module.exports = router;



