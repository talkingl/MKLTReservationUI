-- Database Manipulation queries for our Hotel MKLT Project Website

--
--CREATE
--
-- inserts into tables
INSERT INTO Employees (firstName, lastName, shiftWorked, payRate)
VALUES (:firstNameInput, :lastNameInput, :shiftWorkedInput, :payRateInput);

INSERT INTO Customers (firstName, lastName, emailAddress, phoneNumber)
VALUES (:firstNameInput, :lastNameInput, :emailAddressInput, :phoneNumberInput);

INSERT INTO Rooms (roomFloor, roomNumber, roomType, roomPrice)
VALUES (:roomFloorInput, :roomNumberInput, :roomTypeInput, :roomPriceInput);

INSERT INTO Invoices (reservationID, invoiceAmount, creditCard, dueDate, invoicePaid)
VALUES (:reservationIDInput, :invoiceAmountInput, :creditCardInput,
    :dueDateInput, :invoicePaidInput);

INSERT INTO Reservations (customerID, employeeID, checkInDate, stayLength,
specialRequests) VALUES (:customerIDInput,:employeeIDInput,
    :checkInDateInput, :stayLengthInput, :specialRequestsInput);

INSERT INTO RoomReservations (roomID, reservationID )
VALUES (:roomIDInput, :reservationIDInput);

--
--READ
--
--Select alls for each of the tables to display
SELECT * from Employees;

SELECT * from Customers;

SELECT * from Rooms;

SELECT * from Invoices;

SELECT res.customerID, res.employeeID, res.checkInDate, res.stayLength,
  room.roomNumber, rr.checkedIn, rr.checkedOut, res.specialRequests
FROM Reservations AS res
INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID
INNER JOIN Rooms AS room ON rr.roomID = room.roomID;

SELECT room.roomNumber, concat(cust.firstName, ' ', cust.lastName) AS custName, res.checkInDate
FROM Customers AS cust
INNER JOIN Reservations AS res ON cust.customerID = res.customerID
INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID
INNER JOIN Rooms AS room ON rr.roomID = room.roomID;

--search functionality
SELECT * FROM Rooms
WHERE roomFloor = '%:searchQuery%';

SELECT * FROM Rooms
WHERE roomType LIKE '%:searchQuery%';

SELECT * FROM Employees
WHERE employeeID = '%:searchQuery%';

SELECT * FROM Employees
WHERE firstName LIKE '%:searchQuery%' OR lastName LIKE '%:searchQuery%';

SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers
WHERE customerID = '%:searchQuery%';

SELECT customerID, firstName, lastName, emailAddress, phoneNumber FROM Customers
WHERE firstName LIKE '%:searchQuery%' OR lastName LIKE '%:searchQuery%';

SELECT * FROM Invoices
WHERE dueDate = '%:searchQuery%';

SELECT res.reservationID, cus.firstName AS cusFName, cus.lastName AS cusLName,
  emp.firstName AS empFName, emp.lastName AS empLName, res.checkInDate,
  res.stayLength, res.specialRequests
FROM Customers AS cus
INNER JOIN Reservations AS res ON res.customerID = cus.customerID
INNER JOIN Employees AS emp ON res.employeeID = emp.employeeID
WHERE cus.firstName LIKE '%:searchQuery%' OR cus.lastName LIKE '%:searchQuery%';

SELECT room.roomID, room.roomNumber,
  concat(cust.firstName, ' ', cust.lastName) AS customerName, res.checkInDate,
  res.reservationID, rr.checkedIn, rr.checkedOut
FROM Customers AS cust
INNER JOIN Reservations AS res ON cust.customerID = res.customerID
INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID
INNER JOIN Rooms AS room ON rr.roomID = room.roomID
WHERE res.checkInDate = '%:searchQuery%';

--dropdowns read queries
SELECT customerID, firstName, lastName FROM Customers;
SELECT employeeID, firstName, lastName FROM Employees;
SELECT roomID, roomNumber, roomType FROM Rooms;
SELECT res.reservationID, cust.firstName, cust.lastName,
  DATE_FORMAT(res.checkInDate,'%m/%d/%Y') AS checkInDate
  FROM Reservations AS res
  INNER JOIN Customers AS cust
  ON cust.customerID = res.customerID;

--
--UPDATE
--
UPDATE Employees SET firstName = :firstNameInput, lastName= :lastNameInput,
  shiftWorked = :shiftWorkedInput, payRate= :payRateInput
WHERE employeeID= :employeeIDInput;

UPDATE Customers
SET firstName = :firstNameInput, lastName= :lastNameInput,
  emailAddress = :emailAddressInput, phoneNumber= :phoneNumberInput
WHERE customerID= :customerIDInput;

UPDATE Rooms
SET roomFloor = :roomFloorInput, roomNumber= :roomNumberInput,
  roomType = :roomTypeInput, roomPrice= :roomPriceInput
WHERE roomID= :roomIDInput;

UPDATE Invoices
SET reservationID = :reservationIDInput, invoiceAmount= :invoiceAmountInput,
  creditCard = :creditCardInput, dueDate = :dueDateInput,
  invoicePaid = :invoicePaidInput
WHERE invoiceID= :invoiceIDInput;

UPDATE Reservations
SET customerID = :customerIDInput, employeeID= :employeeIDInput,
  checkInDate = :checkInDateInput, stayLength= :stayLengthInput,
  specialRequests= :specialRequestsInput
WHERE reservationID= :reservationIDInput;

UPDATE RoomReservations
SET checkedIn= :checkedInInput
WHERE roomID= :roomIDInput AND reservationID= :reservationIDInput;

UPDATE RoomReservations
SET checkedOut= :checkedOutInput
WHERE roomID= :roomIDInput AND reservationID= :reservationIDInput;

--
--DELETE
--
DELETE FROM Employees WHERE employeeID = :employeeID_from_form;

DELETE FROM Customers WHERE customerID = :customerID_from_form;

DELETE FROM Rooms WHERE roomID = :roomID_from_form;

DELETE FROM Invoices WHERE invoiceID = :invoiceID_from_form;

DELETE FROM Reservations WHERE reservationID = :reservationID_from_form;

DELETE FROM RoomReservations
WHERE reservationID = :reservationID_from_form AND roomID = :roomID_from_form;
