var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 8000;
var bodyParser = require("body-parser");
var db = require("./dbcon");
var router = express.Router();
var cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//creates a room
app.post("/createroom", function (req, res) {
  let inserts = [
    req.body.roomFloor,
    req.body.roomNumber,
    req.body.roomType,
    req.body.roomPrice,
  ];

  sql =
    "INSERT INTO Rooms (roomFloor, roomNumber, roomType, roomPrice) VALUES (?,?,?,?)";
  db.pool.query(sql, inserts, function (error, result, fields) {
    if (error) {
      console.log(JSON.stringify(error));
      res.write(JSON.stringify(error));
    } else {
      res.send(result);
    }
  });
});

// displays rooms
app.get("/displayrooms", function (req, res) {
  query = "SELECT * FROM Rooms";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// displays rooms with Id

// displays rooms
app.put("/updaterooms", function (req, res) {
  let inserts = [
    req.body.roomFloor,
    req.body.roomNumber,
    req.body.roomType,
    req.body.roomPrice,
    req.body.roomID,
  ];
  console.log(inserts, req.body);
  query =
    "UPDATE Rooms SET roomFloor=?, roomNumber=?, roomType=?, roomPrice=? WHERE roomID=?;";
  //   query =
  //     "UPDATE Rooms (roomFloor, roomNumber, roomType, roomPrice) VALUES (?,?,?,?) WHERE (roomID) = values (?);";
  db.pool.query(query, inserts, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// deletes a room
app.delete("/deleteroom", function (req, res) {
  console.log("Deleting room: ", req.body);
  query = "DELETE FROM Rooms WHERE roomID = ?";
  db.pool.query(query, req.body.roomID, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//displays employees
app.get("/displayemployees", function (req, res) {
  query = "SELECT * FROM Employees";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//adds an employee
app.post("/createemployee", function (req, res) {
  console.log(req.body);
  var mysql = req.app.get("mysql");
  var sql =
    "INSERT INTO Employees (firstName, lastName, shiftWorked, payRate) VALUES (?,?,?,?)";
  var inserts = [
    req.body.firstName,
    req.body.lastName,
    req.body.shiftWorked,
    req.body.payRate,
  ];
  db.pool.query(sql, inserts, function (error, result, fields) {
    if (error) {
      console.log(JSON.stringify(error));
      res.write(JSON.stringify(error));
    } else {
      res.send(result);
    }
  });
});

//displays customers
app.get("/displaycustomers", function (req, res) {
  query =
    "SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    // console.log(res);
    res.send(result);
  });
});
//creates a customer
app.post("/createcustomer", function (req, res) {
  console.log(req.body);
  var mysql = req.app.get("mysql");
  var sql =
    "INSERT INTO Customers (firstName, lastName, emailAddress, phoneNumber) VALUES (?,?,?,?)";
  var inserts = [
    req.body.firstName,
    req.body.lastName,
    req.body.emailAddress,
    req.body.phoneNumber,
  ];
  db.pool.query(sql, inserts, function (error, result, fields) {
    if (error) {
      console.log(JSON.stringify(error));
      res.write(JSON.stringify(error));
    } else {
      res.send(result);
    }
  });
});

//displays invoices
app.get("/displayinvoices", function (req, res) {
  query = "SELECT * FROM Invoices";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});
//creates an invoice
app.post("/createinvoice", function (req, res) {
  console.log(req.body);
  var mysql = req.app.get("mysql");
  var sql =
    "INSERT INTO Invoices (reservationID, invoiceAmount, creditCard, dueDate, invoicePaid) VALUES (?,?,?,?,?)";
  var inserts = [
    req.body.reservationID,
    req.body.invoiceAmount,
    req.body.creditCard,
    req.body.dueDate,
    req.body.invoicePaid,
  ];
  db.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      console.log(JSON.stringify(error));
      res.write(JSON.stringify(error));
    } else {
      res.send(results);
    }
  });
});

//creates a reservation
app.post("/createreservation", function (req, res) {
  console.log(req.body);
  var mysql = req.app.get("mysql");
  let inserts = [
    req.body.customerID,
    req.body.employeeID,
    req.body.checkInDate,
    req.body.stayLength,
    req.body.specialRequests,
    req.body.checkedIn,
    req.body.checkedOut,
  ];

  sql =
    "INSERT INTO Reservations (customerID, employeeID, checkInDate, stayLength, specialRequests, checkedIn, checkedOut) VALUES (?,?,?,?,?,?,?)";
  db.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      console.log(JSON.stringify(error));
      res.write(JSON.stringify(error));
    } else {
      res.send(results);
    }
  });
});

//displays reservations
app.get("/displayreservations", function (req, res) {
  query = "SELECT * FROM Reservations";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//displays room and reservations table
app.get("/displayroomreservations", function (req, res) {
  query = "SELECT * FROM RoomReservations";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(PORT, function () {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
