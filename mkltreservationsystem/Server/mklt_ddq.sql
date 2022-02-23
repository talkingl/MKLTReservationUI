SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `Rooms` (
  `roomID` int(11) NOT NULL,
  `roomFloor` int(11) NOT NULL,
  `roomNumber` int(11) NOT NULL,
  `roomType` char(11) NOT NULL,
  `roomPrice` float(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL,
  `firstName` char(11) NOT NULL,
  `lastName` char(11) NOT NULL,
  `emailAddress` varchar(11) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL,
  `firstName` char(11) NOT NULL,
  `lastName` char(11) NOT NULL,
  `shiftWorked` char(11) NOT NULL,
  `payRate` float(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Reservations` (
  `reservationID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  `checkInDate` Date NOT NULL,
  `stayLength` int(11) NOT NULL,
  `checkedIn` boolean NOT NULL,
  `checkedOut` boolean NOT NULL,
  `specialRequests` text(256) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL,
  `reservationID` int(11) NOT NULL,
  `invoiceAmount` int(11) NOT NULL,
  `creditCard` bigInt(11) NOT NULL,
  `dueDate` Date NOT NULL,
  `invoicePaid` boolean NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
