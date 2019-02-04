# Flights-API-Node.js-with-MysQL

Nodejs API to display information from a MySQL database.
The MySQL database will contain flight info at Edinbugh Airport ie. FlightNo, ArrDep, Date.
Flight info will be extracted from a JSON file within the folder and put into the database.

API Functionality

/flights Return all flights

/flights/arrivals Return all arrivals

/flights/departures Return all departures

/flights/flight/BA1440 Return only the flight specified. E.g. BA1440

