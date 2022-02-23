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
  `payRate` float(11) DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Sample data for table `Employees`
--
LOCK TABLES `Employees` WRITE;
INSERT INTO `Employees` VALUES (1,'John', 'Doe', 2, 8.75),(2,'Jane', 'Smith', 1, 8.75),
(3,'Morgan', 'Kandula'),(4,'Logan','Talkington');
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
  PRIMARY KEY (`customerID`),
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;

--
-- Sample data for table `Customers`
--
LOCK TABLES `Customers` WRITE;
INSERT INTO `Customers` VALUES (6,'Logan','Talkington','lt@osu.com','123-456-7890'),
(9,'Morgan','Kandula','mk@osu.com','123-456-0000'),(121,'Green','Lantern','gl@jl.com','123-456-1212'),
(156,'Wonder','Woman','ww@dc.com','123-456-1111'),(157,'James','Fox','jf@abc.com'),(158,'Customer','Twenty','ct@two.com');
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
  `roomPrice` float(11) NOT NULL,
  PRIMARY KEY (`roomID`)
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
(8,4,'401','King Suite', 149.55)(9,5,'501','Queen', 100.50);
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
  `checkedIn` tinyint DEFAULT 0,
  `checkedOut` tinyint DEFAULT 0,
  PRIMARY KEY (`reservationID`),
  CONSTRAINT `Reservations` FOREIGN KEY (`customerID`)
    REFERENCES `Customers` (`customerID`),
  CONSTRAINT `Reservations` FOREIGN KEY (`employeeID`)
    REFERENCES `Employees` (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Reservations`
--
LOCK TABLES `Reservations` WRITE;
INSERT INTO `Reservations` VALUES (1,2,NULL,'02/15/2022',3,NULL,1,1),
(2,1,1,'03/01/2022',7,'Honeymoon',0,0),(3,3,2,'02/28/2022',1,NULL,0,0),
(4,2,1,'02/22/2022',4,NULL,1,0);
UNLOCK TABLES;

--
-- Table structure for table `RoomReservations`
--
DROP TABLE IF EXISTS `RoomReservations`;
CREATE TABLE `RoomReservations` (
  `roomID` int(11) NOT NULL DEFAULT '0',
  `reservationID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`roomID`,`reservationID`),
  CONSTRAINT `RoomReservations` FOREIGN KEY (`roomID`)
    REFERENCES `Rooms` (`roomID`),
  CONSTRAINT `RoomReservations` FOREIGN KEY (`reservationID`)
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
  `invoiceAmount` float(11) NOT NULL,
  `creditCard` bigint DEFAULT NULL,
  `dueDate` date NOT NULL,
  `invoicePaid` tinyint DEFAULT 0;
  PRIMARY KEY (`invoiceID`)
  CONSTRAINT `Invoices` FOREIGN KEY (`reservationID`)
    REFERENCES `Reservations` (`reservationID`),
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Sample data for table `Invoices`
--
LOCK TABLES `Invoices` WRITE;
INSERT INTO `Invoices` VALUES (1,1,2.22,NULL,'02/22/2022',1),
(2,1,50.45,NULL,'02/28/2022',0),(3,4,98.75,NULL,'03/15/2022',0),
(4,3,100.75,1234567890901234,'03/01/2022',0),(5,4,45.77,NULL,'02/21/2022',1);
UNLOCK TABLES;
