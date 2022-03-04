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
  let room = {
    roomFloor: req.body.roomFloor,
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    roomPrice: req.body.roomPrice,
  };
  console.log("Got body:", req.body);
  res.json({ ...req.body });

  query = "INSERT INTO Rooms SET ?";
  db.pool.query(query, room, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
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
app.get("/createemployee", function (req, res) {
  let employee = {
    firstName: "Jon",
    lastName: "Snow",
    shiftWorked: "all",
    payRate: 27.55,
  };
  query = "INSERT INTO Employees SET ?";
  db.pool.query(query, employee, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//displays customers
app.get("/displaycustomers", function (req, res) {
  query = "SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers";
  db.pool.query(query, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});
//creates a customer
app.post('/createcustomer', function(req, res){
    console.log(req.body);
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Customers (firstName, lastName, emailAddress, phoneNumber) VALUES (?,?,?,?)";
    var inserts = [req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.phoneNumber];
    db.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
        }else{
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
app.post('/createinvoice', function(req, res){
    console.log(req.body);
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Invoices (reservationID, invoiceAmount, creditCard, dueDate, invoicePaid) VALUES (?,?,?,?,?)";
    var inserts = [req.body.reservationID, req.body.invoiceAmount, req.body.creditCard, req.body.dueDate, req.body.invoicePaid];
    db.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
        }else{
            res.send(result);
        }
    });
  });

//creates a reservation
app.get("/createreservation", function (req, res) {
  let reservation = {
    customerID: 157,
    employeeID: 4,
    checkInDate: 2022 - 03 - 22,
    stayLength: 5,
    specialRequests: "want a taco bar",
    checkedIn: 0,
    checkedOut: 0,
  };
  query = "INSERT INTO Reservations SET ?";
  db.pool.query(query, reservation, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
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
