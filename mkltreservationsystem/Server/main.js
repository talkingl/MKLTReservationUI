var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 9100;
var bodyParser = require("body-parser");
var db = require("./dbcon");
var router = express.Router();
var cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// for customer name dropdown menus
app.get("/listcustomers", function (req, res) {
  db.pool.query(
    "SELECT customerID, firstName, lastName FROM Customers",
    function (error, result, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

// for employee name dropdown menus
app.get("/listemployees", function (req, res) {
  db.pool.query(
    "SELECT employeeID, firstName, lastName FROM Employees",
    function (error, result, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

// for room dropdown menus
app.get("/listrooms", function (req, res) {
  db.pool.query(
    "SELECT roomID, roomNumber, roomType FROM Rooms ORDER BY roomNumber",
    function (error, result, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

// for reservation dropdown menus
app.get("/listreservations", function (req, res) {
  db.pool.query(
    "SELECT res.reservationID, cust.firstName, cust.lastName, DATE_FORMAT(res.checkInDate,'%m/%d/%Y') AS checkInDate FROM Reservations AS res INNER JOIN Customers AS cust ON cust.customerID = res.customerID",
    function (error, result, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

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
  query = "SELECT * FROM Rooms ORDER BY roomNumber";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search rooms by floor
app.get("/displayroomsbyfloor/:filter/:keyword", function (req, res) {
  query = "SELECT * FROM Rooms WHERE roomFloor = '" + req.params.keyword + "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search rooms by Type
app.get("/displayrooms/:filter/:keyword", function (req, res) {
  query =
    "SELECT * FROM Rooms WHERE roomType LIKE '" + req.params.keyword + "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// updates rooms
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
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// deletes a room
app.delete("/deleteroom", function (req, res) {
  console.log("Deleting room: ", req.body);
  query = "DELETE FROM Rooms WHERE roomID = ?";
  db.pool.query(query, req.body.roomID, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//displays employees
app.get("/displayemployees", function (req, res) {
  query = "SELECT * FROM Employees";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search employees by ID
app.get("/displayemployees/:id", function (req, res) {
  query = "SELECT * FROM Employees WHERE employeeID = '" + req.params.id + "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search employees by name
app.get("/displayemployees/:filter/:keyword", function (req, res) {
  query =
    "SELECT * FROM Employees WHERE firstName LIKE '" +
    req.params.keyword +
    "' OR lastName LIKE '" +
    req.params.keyword +
    "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//updates employee
app.put("/updateemployees", function (req, res) {
  let inserts = [
    req.body.firstName,
    req.body.lastName,
    req.body.shiftWorked,
    req.body.payRate,
    req.body.employeeID,
  ];
  console.log(inserts, req.body);
  query =
    "UPDATE Employees SET firstName=?, lastName=?, shiftWorked=?, payRate=? WHERE employeeID=?;";
  db.pool.query(query, inserts, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
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

// deletes an employee
app.delete("/deleteemployee", function (req, res) {
  console.log("Deleting employee: ", req.body);
  query = "DELETE FROM Employees WHERE employeeID = ?";
  db.pool.query(query, req.body.employeeID, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//displays customers
app.get("/displaycustomers", function (req, res) {
  query =
    "SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers ";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search customers by ID
app.get("/displaycustomers/:id", function (req, res) {
  query =
    "SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers WHERE customerID = '" +
    req.params.id +
    "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search customers by name
app.get("/displaycustomers/:filter/:keyword", function (req, res) {
  query =
    "SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers WHERE firstName LIKE '" +
    req.params.keyword +
    "' OR lastName LIKE '" +
    req.params.keyword +
    "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
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
//updates customers
app.put("/updatecustomers", function (req, res) {
  let inserts = [
    req.body.firstName,
    req.body.lastName,
    req.body.emailAddress,
    req.body.phoneNumber,
    req.body.customerID,
  ];
  console.log(inserts, req.body);
  query =
    "UPDATE Customers SET firstName=?, lastName=?, emailAddress=?, phoneNumber=? WHERE customerID=?;";
  db.pool.query(query, inserts, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
// deletes a customer
app.delete("/deletecustomer", function (req, res) {
  console.log("Deleting customer: ", req.body);
  query = "DELETE FROM Customers WHERE customerID = ?";
  db.pool.query(query, req.body.customerID, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//displays invoices
app.get("/displayinvoices", function (req, res) {
  query = "SELECT * FROM Invoices";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search invoices
app.get("/displayinvoices/:filter/:date/:keyword", function (req, res) {
  query = "SELECT * FROM Invoices WHERE dueDate = '" + req.params.keyword + "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
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

//updates invoices
app.put("/updateinvoices", function (req, res) {
  let inserts = [
    req.body.invoiceAmount,
    req.body.creditCard,
    req.body.dueDate,
    req.body.invoicePaid,
    req.body.invoiceID,
  ];
  console.log(inserts, req.body);
  query =
    "UPDATE Invoices SET invoiceAmount=?, creditCard=?, dueDate=?, invoicePaid=?  WHERE invoiceID=?;";
  db.pool.query(query, inserts, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// deletes an invoice
app.delete("/deleteinvoice", function (req, res) {
  console.log("Deleting invoice: ", req.body);
  query = "DELETE FROM Invoices WHERE invoiceID = ?";
  db.pool.query(query, req.body.invoiceID, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
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
  ];

  sql =
    "INSERT INTO Reservations (customerID, employeeID, checkInDate, stayLength, specialRequests) VALUES (?,?,?,?,?)";
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
  query =
    "SELECT res.reservationID, res.customerID, res.employeeID, cus.firstName AS cusFName, cus.lastName AS cusLName, emp.firstName AS empFName, emp.lastName AS empLName, res.checkInDate, res.stayLength, res.specialRequests FROM Customers AS cus INNER JOIN Reservations AS res ON res.customerID = cus.customerID LEFT JOIN Employees AS emp ON res.employeeID = emp.employeeID";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Search reservations
app.get("/displayreservations/:filter/:keyword", function (req, res) {
  query =
    "SELECT res.reservationID, cus.firstName AS cusFName, cus.lastName AS cusLName, emp.firstName AS empFName, emp.lastName AS empLName, res.checkInDate, res.stayLength, res.specialRequests FROM Customers AS cus INNER JOIN Reservations AS res ON res.customerID = cus.customerID INNER JOIN Employees AS emp ON res.employeeID = emp.employeeID WHERE cus.firstName LIKE '" +
    req.params.keyword +
    "' OR cus.lastName LIKE '" +
    req.params.keyword +
    "'";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//updates invoices
app.put("/updatereservation", function (req, res) {
  let inserts = [
    req.body.customerID,
    req.body.employeeID,
    req.body.checkInDate,
    req.body.stayLength,
    req.body.specialRequests,
    req.body.reservationID,
  ];
  console.log(inserts, req.body);
  query =
    "UPDATE Reservations SET customerID=?, employeeID=?, checkInDate=?, stayLength=?, specialRequests=?   WHERE reservationID=?;";
  db.pool.query(query, inserts, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// deletes a reservation
app.delete("/deletereservation", function (req, res) {
  console.log("Deleting reservation: ", req.body);
  query = "DELETE FROM Reservations WHERE reservationID = ?";
  db.pool.query(query, req.body.reservationID, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//displays room reservations table
app.get("/displayguestcheckinout", function (req, res) {
  query =
    "SELECT room.roomID, room.roomNumber, concat(cust.firstName, ' ', cust.lastName) AS customerName, res.checkInDate, res.reservationID, rr.checkedIn, rr.checkedOut FROM Customers AS cust INNER JOIN Reservations AS res ON cust.customerID = res.customerID INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID INNER JOIN Rooms AS room ON rr.roomID = room.roomID ORDER BY room.roomNumber;";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//Search for a specific checkInDate for roomReservations page
app.get("/displayguestcheckinout/:filter/:date/:keyword", function (req, res) {
  query =
    "SELECT room.roomID, room.roomNumber, concat(cust.firstName, ' ', cust.lastName) AS customerName, res.checkInDate, res.reservationID, rr.checkedIn, rr.checkedOut FROM Customers AS cust INNER JOIN Reservations AS res ON cust.customerID = res.customerID INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID INNER JOIN Rooms AS room ON rr.roomID = room.roomID WHERE res.checkInDate = '" +
    req.params.keyword +
    "';";
  db.pool.query(query, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// add room-reservation
app.post("/createroomreservation", function (req, res) {
  console.log(req.body);
  var mysql = req.app.get("mysql");
  let inserts = [req.body.roomID, req.body.reservationID];

  sql = "INSERT INTO RoomReservations (roomID, reservationID) VALUES (?,?)";
  db.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      console.log(JSON.stringify(error));
      res.write(JSON.stringify(error));
    } else {
      res.send(results);
    }
  });
});

// update guest's check-in status based on Check-In/Out Page
app.put("/updatecheckin", function (req, res) {
  let inserts = [req.body.checkedIn, req.body.reservationID, req.body.roomID];
  console.log(inserts, req.body);
  query =
    "UPDATE RoomReservations SET checkedIn=? WHERE reservationID=? AND roomID=?;";
  db.pool.query(query, inserts, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// update guest's check-out status based on Check-In/Out Page
app.put("/updatecheckout", function (req, res) {
  let inserts = [req.body.checkedOut, req.body.reservationID, req.body.roomID];
  console.log(inserts, req.body);
  query =
    "UPDATE RoomReservations SET checkedOut=? WHERE reservationID=? AND roomID=?;";
  db.pool.query(query, inserts, (err, result) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
    } else {
      console.log(result);
      res.send(result);
    }
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
