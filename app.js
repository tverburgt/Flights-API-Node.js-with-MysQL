//Nodejs API to display information from a MySQL database.
//The MySQL database will contain flight info at Edinbugh Airport ie. FlightNo, ArrDep, Date.
//Flight info will be extracted from a JSON file within the folder and put into the database.
//GET rule is used to provide the functionalities of this API.

const express = require('express');
const mysql = require('mysql');
app = express();
app.use(express.json()); //Middleware that allows express to parse json encoded
//bodies sent from the client.
const file = require('./flights');
const read = require('./read');

//////////////////Connect to MySQL database.

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newdb'
});
db.connect((err) => {
  if(err) throw err;
  console.log('Connected to database...');
});
//////////////////////////////////////////

//Use these Routes to setup a database, table and export values
//from the json file into database.
read.createDatabase(db); // http://localhost:3000/createDatabase
read.createTable(db); // http://localhost:3000/createTable
read.exportJSONValues(db); // http://localhost:3000/exportJSONValues


//Various Read (GET) routes or endpoints created.
read.flights(db);  // http://localhost:3000/flights
read.arrivals(db);  // http://localhost:3000/flights/arrivals
read.departures(db);  // http://localhost:3000/flights/departures
read.flight(db);  // http://localhost:3000/flights/:flight

//Initialised port.
const port = process.env.PORT || 3000; //Find port that will be used by webservice using the global object process.
app.listen(port, ()=>{
  console.log(`Listening through port ${port}`);
});
