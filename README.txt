README.txt
FantasyTradeAnalyzer
Nethan S
Deployed at https://salty-fjord-36439.herokuapp.com/

FantasyTradeAnalyzer is a small personal project created to learn the MERN (MondoDb, Express, React, Nodejs) stack. As of 12/8/21 
the webscraping of updated projected fantasy stats is run manually by me, but auto running of the file in prod can be added if desired
down the road. Then the code allows the user to create two teams made up of players held in the db. One limitation here is that only
the top 50 players at each fantasy position are in the db and eligible to add to a team. This normally isn't going to be an issue 
since most leagues are 8-12 teams and having more than 4 players in a single position is not common or advisable. They can then use the 
compare button to have add up each teams total and reveal which team will yield more fantasy points for the given week. If either team 
is edited the results part of the UI is reset and the user can then use the compare button again to see the results of the updated teams.

Due to this being my first MERN stack project, there are likely portions/functionalities that are not implemented in the most efficient
ways possible. Here is a very basic rundown of project steps and sources:

- Created MongoDb cluster and initialized with test data (following MongoDb documentation)
- Wrote node code to connect to MongoDb and successfully complete the CRUD operations with test data (following MongoDb documentation)
- Wrote the Webscraping code to connect to the MongoDb and store in db (following many different guides, online forum q/a)
- Began creating express api routes (modified from the previous steps code and https://www.mongodb.com/languages/mern-stack-tutorial)
- Began learing react (following https://reactjs.org/docs/introducing-jsx.html)
- Implemented React/front end code (mostly through trial and error and mongo db mern tutorial)
- Learned some CSS (following official CSS documentation and https://www.w3schools.com/css/default.asp)
- Added styling to front end
- Researched deployment methods (referencing https://www.freecodecamp.org/news/deploying-a-mern-application-using-mongodb-atlas-to-heroku/)
- Completed UI alterations, code clean up, package.json/env/security changes, organized repo's



Dependencies:
- axios: used to help make api calls
- cors: used to allow Cross-Origin Resource Sharing
- dotenv: used to load environment variables from .env file to process.env
- express: used to create express server
- mongodb: used to connect to MongoDb
- react-responsive: used for media queries which help build UI for different screen sized
- react-router: used to route between different react UI
- react-router-dom: used to route between different react UI
