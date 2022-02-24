-- These are some Database Manipulation queries for a partially implemented Project Website
-- using the bsg database.
-- Your submission should contain ALL the queries required to implement ALL the
-- functionalities listed in the Project Specs.

--Select alls for each of the tables to display
SELECT * from Employees;

SELECT * from Customers;

SELECT * from Rooms;

SELECT * from Invoices;

SELECT res.customerID, res.employeeID, res.checkInDate, res.stayLength,
  room.roomNumber, res.checkedIn, res.checkedOut, res.specialRequest
FROM Reservations AS res
INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID
INNER JOIN Rooms AS room ON rr.roomID = room.roomID;

SELECT room.roomNumber, concat(cust.firstName, ' ', cust.lastName), res.checkInDate
FROM Customers AS cust
INNER JOIN Reservations AS res ON cust.customerID = res.customerID
INNER JOIN RoomReservations AS rr ON res.reservationID = rr.reservationID
INNER JOIN Rooms AS room ON rr.roomID = room.roomID;

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
  specialRequests, checkedIn, checkedOut) VALUES (:customerIDInput,
  :employeeIDInput, :checkedInInput, :stayLengthInput,
  :specialRequestsInput, :checkedInInput,  :checkedOutInput);

--
-- This needs to be linked to the above Reservations insert function...
--
INSERT INTO RoomsReservations (roomID, reservationID )
VALUES (:roomIDInput, :reservationIDInput);

-- updates for each table
UPDATE Employees SET firstName = :firstNameInput, lastName= :lastNameInput,
  shiftWorked = :shiftWorkedInput, payRate= :payRateInput
WHERE id= :employeeIDInput;

UPDATE Customers
SET firstName = :firstNameInput, lastName= :lastNameInput,
  emailAddress = :emailAddressInput, phoneNumber= :phoneNumberInput
WHERE id= :customerIDInput;

UPDATE Rooms
SET roomFloor = :roomFloorInput, roomNumber= :roomNumberInput,
  roomType = :roomTypeInput, roomPrice= :roomPriceInput
WHERE id= :roomIDInput;

UPDATE Invoices
SET reservationID = :reservationIDInput, invoiceAmount= :invoiceAmountInput,
  creditCard = :creditCardInput, dueDate = :dueDateInput,
  invoicePaid = :invoicePaidInput
WHERE id= :invoiceIDInput;

UPDATE Reservations
SET customerID = :customerIDInput, employeeID= :employeeIDInput,
  checkInDate = :checkInDateInput, stayLength= :stayLengthInput,
  specialRequests= :specialRequestsInput, checkedIn= :checkedInInput,
  checkedOut= :checkedOutInput
WHERE id= :reservationIDInput;
-- need to incorporate changes to RoomReservations here also^^

-- Below are updates based on the Guest Check In/Out Page, figure out how to link them back
UPDATE Reservations
SET checkedIn= :checkedInInput
WHERE id= :reservationIDInput;

UPDATE Reservations
SET checkedOut= :checkedOutInput
WHERE id= :reservationIDInput;

--delete each table
DELETE FROM Employees WHERE id = :employeeID_from_form;

DELETE FROM Customers WHERE id = :customerID_from_form;

DELETE FROM Rooms WHERE id = :roomID_from_form;

DELETE FROM Invoices WHERE id = :invoiceID_from_form;

DELETE FROM Reservations WHERE id = :reservationID_from_form;
-- also need to delete RoomReservations related to this reservationID
DELETE FROM RoomReservations
WHERE resID = :reservationID_from_form AND roomID = :roomID_from_form;


--search functionality
SELECT *
FROM :tableName
WHERE :columnName LIKE '%:searchQuery%';
