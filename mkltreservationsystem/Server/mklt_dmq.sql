-- These are some Database Manipulation queries for a partially implemented Project Website 
-- using the bsg database.
-- Your submission should contain ALL the queries required to implement ALL the
-- functionalities listed in the Project Specs.

--Select alls for each of the tables to display
SELECT * from Employees

SELECT * from Customers

SELECT * from Rooms

SELECT * from Reservations

SELECT * from RoomReservations

-- inserts into tables
INSERT INTO Employees (firstName, lastName, shiftWorked, payRate) VALUES (:firstNameInput, :lastNameInput, :shiftWorkedInput, :payRateInput)

INSERT INTO Customers (firstName, lastName, emailAddress, phoneNumber) VALUES (:firstNameInput, :lastNameInput, :emailAddressInput, :phoneNumberInput)

INSERT INTO Rooms (roomFloor, roomNumber, roomType, roomPrice) VALUES (:roomFloorInput, :roomNumberInput, :roomTypeInput, :roomPriceInput)

INSERT INTO Reservations (customerID, employeeID, checkInDate, stayLength, specialRequests, checkedIn, checkedOut) VALUES (:customerIDInput, :employeeIDInput, :checkedInInput, :stayLengthInput,  :specialRequestsInput,  :checkedInInput,  :checkedOutInput)

INSERT INTO RoomsReservations (roomID, reservationID ) VALUES (:roomIDInput, :reservationIDInput)

-- updates for each table
UPDATE Employees SET firstName = :firstNameInput, lastName= :lastNameInput, shiftWorked = :shiftWorkedInput, payRate= :payRateInput WHERE id= :employeeIDInput

UPDATE Customers SET firstName = :firstNameInput, lastName= :lastNameInput, emailAddress = :emailAddressInput, phoneNumber= :phoneNumberInput WHERE id= :customerIDInput

UPDATE Rooms SET roomFloor = :roomFloorInput, roomNumber= :roomNumberInput, roomType = :roomTypeInput, roomPrice= :roomPriceInput WHERE id= :roomIDInput

UPDATE Reservations SET customerID = :customerIDInput, employeeID= :employeeIDInput, checkInDate = :checkInDateInput, stayLength= :stayLengthInput, specialRequests= :specialRequestsInput, checkedIn= :checkedInInput, checkedOut= :checkedOutInput WHERE id= :reservationIDInput

--delete each table
DELETE FROM Employees WHERE id = :employeeID_from_form

DELETE FROM Customers WHERE id = :customerID_from_form

DELETE FROM Rooms WHERE id = :roomID_from_form

DELETE FROM Reservations WHERE id = :reservationID_from_form

--search functionality
SELECT *
FROM :tableName
WHERE :columnName LIKE '%:searchQuery%';

-------------------------------------------------------------
-- get all Planet IDs and Names to populate the Homeworld dropdown
SELECT planet_id, name FROM bsg_planets

-- get all characters and their homeworld name for the List People page
SELECT bsg_people.character_id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id

-- get a single character's data for the Update People form
SELECT character_id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = :character_ID_selected_from_browse_character_page

-- get all character's data to populate a dropdown for associating with a certificate  
SELECT character_id AS pid, fname, lname FROm bsg_people 
-- get all certificates to populate a dropdown for associating with people
SELECT certification_id AS cid, title FROM bsg_cert

-- get all peoople with their current associated certificates to list
SELECT pid, cid, CONCAT(fname,' ',lname) AS name, title AS certificate 
FROM bsg_people 
INNER JOIN bsg_cert_people ON bsg_people.character_id = bsg_cert_people.pid 
INNER JOIN bsg_cert on bsg_cert.certification_id = bsg_cert_people.cid 
ORDER BY name, certificate

-- add a new character
INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (:fnameInput, :lnameInput, :homeworld_id_from_dropdown_Input, :ageInput)

-- associate a character with a certificate (M-to-M relationship addition)
INSERT INTO bsg_cert_people (pid, cid) VALUES (:character_id_from_dropdown_Input, :certification_id_from_dropdown_Input)

-- update a character's data based on submission of the Update Character form 
UPDATE bsg_people SET fname = :fnameInput, lname= :lnameInput, homeworld = :homeworld_id_from_dropdown_Input, age= :ageInput WHERE id= :character_ID_from_the_update_form

-- delete a character
DELETE FROM bsg_people WHERE id = :character_ID_selected_from_browse_character_page

-- dis-associate a certificate from a person (M-to-M relationship deletion)
DELETE FROM bsg_cert_people WHERE pid = :character_ID_selected_from_certificate_and_character_list AND cid = :certification_ID_selected_from-certificate_and_character_list

