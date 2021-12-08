// server.js
// FantasyTradeAnalyzer
// Nethan S
// This file starts our express server on port 5000.



const express = require("express");
// this is a Node.js package that allows cross origin resource sharing
const cors = require("cors");
// this is to load environment variables from a .env file into process.env file
require("dotenv").config({ path: "./config.env"}); // This line gets the environment variables
// create instance of express app
const app = express();
// create port variable that holds the port that the back end is on
const port = process.env.PORT || 5000;
// get created routes from seperate file (this process isn't necessary, but definitely the only reasonable option if a project has many large/complex routes)
const router = require('./routes/myRoutes');
// used for getting path
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
// Get db driver connection
const dbo = require("./db/db_conn");
// Add routes to express server
app.use('/', router);

// This just serves the react pages
// when a request is sent that isn't in the router
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.log(err);
    });
    console.log(`Server is running on port: ${port}`);
});
