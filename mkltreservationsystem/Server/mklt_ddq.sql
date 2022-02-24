-- Data Definition Queries & Sample Data

--
-- Table structure for table `Employees`
--
DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName`varchar(255) NOT NULL,
  `lastName`varchar(255) NOT NULL,
  `shiftWorked` int(11) DEFAULT NULL,
  `payRate` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Sample data for table `Employees`
--
LOCK TABLES `Employees` WRITE;
INSERT INTO `Employees` VALUES (1,'John', 'Doe', 2, 8.75),(2,'Jane', 'Smith', 1, 8.75),
(3,'Morgan', 'Kandula', NULL, NULL),(4,'Logan','Talkington', NULL, NULL);
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--
DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `phoneNumber` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;

--
-- Sample data for table `Customers`
--
LOCK TABLES `Customers` WRITE;
INSERT INTO `Customers` VALUES (6,'Logan','Talkington','lt@osu.com','123-456-7890'),
(9,'Morgan','Kandula','mk@osu.com','123-456-0000'),
(121,'Green','Lantern','gl@jl.com','123-456-1212'),
(156,'Wonder','Woman','ww@dc.com','123-456-1111'),
(157,'James','Fox','jf@abc.com', NULL),
(158,'Customer','Twenty','ct@two.com', NULL);
UNLOCK TABLES;

--
-- Table structure for table `Rooms`
--
DROP TABLE IF EXISTS `Rooms`;
CREATE TABLE `Rooms` (
  `roomID` int(11) NOT NULL AUTO_INCREMENT,
  `roomFloor` int(11) NOT NULL,
  `roomNumber` char(4) NOT NULL,
  `roomType` varchar(255) NOT NULL,
  `roomPrice` decimal(13,2) NOT NULL,
  PRIMARY KEY (`roomID`),
  UNIQUE KEY `roomNumber` (`roomNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Sample data for table `Rooms`
--
LOCK TABLES `Rooms` WRITE;
INSERT INTO `Rooms` VALUES (1,1,'101','Handicap King', 100.50),
(2,1,'102','Handicap Queen', 98.75),(3,1,'103','Queen', 98.75),
(4,2,'201','Queen', 100.50),(5,2,'202','Jr. Suite', 125.65),
(6,3,'301','Jr. Suite', 125.65),(7,3,'302','King', 115.64),
(8,4,'401','King Suite', 149.55),(9,5,'501','Queen', 100.50);
UNLOCK TABLES;

--
-- Table structure for table `Reservations`
--
DROP TABLE IF EXISTS `Reservations`;
CREATE TABLE `Reservations` (
  `reservationID` int(11) NOT NULL AUTO_INCREMENT,
  `customerID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `checkInDate` date NOT NULL,
  `stayLength` int(11) NOT NULL,
  `specialRequests` longtext DEFAULT NULL,
  `checkedIn` boolean DEFAULT false,
  `checkedOut` boolean DEFAULT false,
  PRIMARY KEY (`reservationID`),
  CONSTRAINT `Reservations_Cust` FOREIGN KEY (`customerID`)
    REFERENCES `Customers` (`customerID`),
  CONSTRAINT `Reservations_Emp` FOREIGN KEY (`employeeID`)
    REFERENCES `Employees` (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Reservations`
--
LOCK TABLES `Reservations` WRITE;
INSERT INTO `Reservations` VALUES (1,6,NULL,'2022-02-15',3,NULL,true,true),
(2,9,1,'2022-03-01',7,'Honeymoon',false,false),(3,121,2,'2022-02-28',1,NULL,false,false),
(4,6,1,'2022-02-22',4,NULL,true,false);
UNLOCK TABLES;

--
-- Table structure for table `RoomReservations`
--
DROP TABLE IF EXISTS `RoomReservations`;
CREATE TABLE `RoomReservations` (
  `roomID` int(11) NOT NULL DEFAULT '0',
  `reservationID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`roomID`,`reservationID`),
  CONSTRAINT `RoomReservations_Room` FOREIGN KEY (`roomID`)
    REFERENCES `Rooms` (`roomID`),
  CONSTRAINT `RoomReservations_Reservation` FOREIGN KEY (`reservationID`)
    REFERENCES `Reservations` (`reservationID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `RoomReservations`
--
LOCK TABLES `RoomReservations` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `Invoices`
--
DROP TABLE IF EXISTS `Invoices`;
CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `reservationID` int(11) NOT NULL,
  `invoiceAmount` decimal(13,2) NOT NULL,
  `creditCard` bigint DEFAULT NULL,
  `dueDate` date NOT NULL,
  `invoicePaid` boolean DEFAULT false,
  PRIMARY KEY (`invoiceID`),
  CONSTRAINT `Invoices` FOREIGN KEY (`reservationID`)
    REFERENCES `Reservations` (`reservationID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Sample data for table `Invoices`
--
LOCK TABLES `Invoices` WRITE;
INSERT INTO `Invoices` VALUES (1,1,2.22,NULL,'2022-02-22',true),
(2,1,50.45,NULL,'2022-02-28',false),(3,4,98.75,NULL,'2022-03-15',false),
(4,3,100.75,1234567890901234,'2022-03-01',false),
(5,4,45.77,NULL,'2022-02-21',true);
UNLOCK TABLES;
