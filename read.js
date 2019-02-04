/////////////////////////////Routes.


function createDatabase(){
  //Create database if one hasn't been created going to this end point.
  app.get('/createdatabase', (req, res) => {
      let sql = 'CREATE DATABASE newdb';
      db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Database created...');
      });
  });
}

// Create a table if one hasn't been created using this endpoint
function createTable(){
  app.get('/createtable', (req, res) => {
      let sql = 'CREATE TABLE flights(FlightNo VARCHAR(255),Date VARCHAR(255),Time VARCHAR(255),ArrDep VARCHAR(255),PortOfCallA VARCHAR(255),Status VARCHAR(255),OtherInfo VARCHAR(255),Additional VARCHAR(255),Airline VARCHAR(255),Image VARCHAR(255),ArrHall VARCHAR(255))';
      db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Table created...');
      });
  });
}

//Send values within flight.json into the newdb DATABASE
// within a created "flights" table.
function exportJSONValues(){
  app.get('/exportJSONvalues', (req, res)=>{
      for(let x = 0; x<file.length;x++){
        let table_head = {
          FlightNo: file[x].FlightNo,
          Date: file[x].Date,
          Time: file[x].Time,
          ArrDep: file[x].ArrDep,
          PortOfCallA: file[x].PortOfCallA,
          Status: file[x].Status,
          OtherInfo: file[x].OtherInfo,
          Airline: file[x].Airline,
          Image: file[x].Image,
          ArrHall: file[x].ArrHall
      };

  let sql = 'INSERT INTO flights SET ?';

  db.query(sql, post, (err, result)=>{
        if(err) throw err;
      });
    }
    res.send(file);
  });
}




//GET request to Return All Flights.
function flights(db){
  app.get('/flights', (req, res)=>{
      let sql = 'SELECT * FROM flights';
      db.query(sql, (err, result)=>{
        if(err){
          res.status(404).send("No Flights were found");
          throw err;
        }
        res.send(result);
      })

  });
}


//GET request to Return All Arrivals.
function arrivals(db){
  app.get('/flights/arrivals', (req, res)=>{
      let sql = "SELECT FlightNo FROM flights WHERE ArrDep = 'A'";
      db.query(sql, (err, result)=>{
        if(err){
          res.status(404).send("No Arrivals were found");
          throw err;
        }
        res.send(result);
      })
  });
}


//GET request to Return All Departures.
function departures(db){
  app.get('/flights/departures', (req, res)=>{
      let sql = "SELECT FlightNo FROM flights WHERE ArrDep = 'D'";
      db.query(sql, (err, result)=>{
        if(err){
          res.status(404).send("No Departures were found");
          throw err;
        }
        res.send(result);
      })
  });
}


//Return only the flight specified. E.g. BA1440
function flight(db){
  app.get('/flights/:flight', (req, res) => {
          let query = db.query(`SELECT * FROM flights WHERE FlightNo='${req.params.flight}'`, (err, result) => {
            if(err){
              res.status(404).send("No Arrivals were found");
              throw err;
            }
          res.send(result);
      });
  });
}

//Exporting the functions to exports object within the global object, module.
module.exports.createDatabase = createDatabase;
module.exports.exportJSONValues = exportJSONValues;
module.exports.createTable = createTable;
module.exports.flights = flights;
module.exports.arrivals = arrivals;
module.exports.departures = departures;
module.exports.flight = flight;
