import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import ReservationList from "../Components/ReservationList";
import { useEffect, useState } from "react";

function Reservations() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [reservations, setReservation] = useState();

  const [reservationToEdit, setReservationToEdit] = useState(" ");
  const [reservationToDelete, setReservationToDelete] = useState(" ");

  const [customerList, setCustomerList] = useState();
  function SearchModal(props) {
    const [customerSearch, setCustomerSearch] = useState();

    const submitButton = async (e) => {
      e.preventDefault();

      let data = { customerSearch: customerSearch };

      // On submit of the form, send a GET request with the date to the server
      const response = await fetch(
        `http://flip2.engr.oregonstate.edu:9100/displayreservations/filter/${customerSearch}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const reservations = await response.json();
      setReservation(reservations);
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Search Reservations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Enter a customer name to search for a Reservation</h2>
          <h4>Customer Name</h4>
          <input
            type="text"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              props.onHide();
              submitButton(e);
            }}
          >
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const loadCustomerList = async () => {
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/listcustomers", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const customers = await response.json();
    setCustomerList(customers);
  };
  useEffect(() => {
    loadCustomerList();
  }, []);

  const [employeeList, setEmployeeList] = useState();
  const loadEmployeeList = async () => {
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/listemployees", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const employees = await response.json();
    setEmployeeList(employees);
  };
  useEffect(() => {
    loadEmployeeList();
  }, []);

  function AddModal(props) {
    const [customerID, setCustomerID] = useState();
    const [employeeID, setEmployeeID] = useState();
    const [checkInDate, setCheckInDate] = useState();
    const [stayLength, setStayLength] = useState();
    const [specialRequests, setSpecialRequests] = useState();

    const submitButton = async (e) => {
      e.preventDefault();
      if (checkInDate === undefined || stayLength === undefined) {
        alert("messed up");
        if (checkInDate === undefined) {
          alert("check in date is incorrect");
        }
        if (stayLength === undefined) {
          alert("stay length is incorrect");
        }
      } else {
        let data = {
          customerID: customerID,
          employeeID: employeeID,
          checkInDate: checkInDate,
          stayLength: stayLength,
          specialRequests: specialRequests,
        };

        // On submit of the form, send a POST request with the data to the server.
        const response = await fetch(
          "http://flip2.engr.oregonstate.edu:9100/createreservation",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          alert("Successfully added the Reservation!");
          loadReservations();
        } else {
          alert(`Failed to add Reservation, status code = ${response.status}`);
          loadReservations();
        }
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Customer</h4>
          <select onChange={(e) => setCustomerID(e.target.value)}>
            <option value="0"></option>
            {customerList?.map((item) => {
              return (
                <option
                  key={item}
                  value={item.customerID}
                  selected={item.customerID === customerID}
                >
                  {item.firstName} {item.lastName}
                </option>
              );
            })}
          </select>
          <h4>Employee</h4>
          <select onChange={(e) => setEmployeeID(e.target.value)}>
            <option value="0"></option>
            {employeeList?.map((item) => {
              return (
                <option
                  key={item}
                  value={item.employeeID}
                  selected={item.employeeID === employeeID}
                >
                  {item.firstName} {item.lastName}
                </option>
              );
            })}
          </select>
          <h4>checkInDate</h4>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          <h4>stayLength</h4>
          <input
            type="number"
            value={stayLength}
            onChange={(e) => setStayLength(e.target.value)}
          ></input>
          <h4>specialRequest</h4>
          <input
            type="text"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              props.onHide();
              submitButton(e);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const loadReservations = async () => {
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/displayreservations");
    const reservations = await response.json();
    setReservation(reservations);
  };
  useEffect(() => {
    loadReservations();
  }, []);

  function UpdateModal(props) {
    const [employeeID, setEmployeeID] = useState(0);
    const [customerID, setCustomerID] = useState(0);
    const [reservationID, setReservationID] = useState(0);
    const [checkInDate, setCheckInDate] = useState(0);
    const [stayLength, setStayLength] = useState(0);
    const [specialRequests, setSpecialRequests] = useState(0);
    const [checkedEmployeeID, setCheckedEmployeeID] = useState(false);
    const [checkedCustomerID, setCheckedCustomerID] = useState(false);
    const [checkedCheckInDate, setCheckedCheckInDate] = useState(false);
    const [checkedStayLength, setCheckedStayLength] = useState(false);
    const [checkedSpecialRequests, setCheckedSpecialRequests] = useState(false);

    let employeeID1 = 0;
    let customerID1 = 0;
    let reservationID1 = 0;
    let checkInDate1 = 0;
    let stayLength1 = 0;
    let specialRequests1 = 0;

    if (props.reservationToEdit) {
      employeeID1 = props.reservationToEdit.employeeID;
      customerID1 = props.reservationToEdit.customerID;
      reservationID1 = props.reservationToEdit.reservationID;
      checkInDate1 =
        props.reservationToEdit.checkInDate !== undefined
          ? props.reservationToEdit.checkInDate.split("T")[0]
          : props.reservationToEdit.checkInDate;
      stayLength1 = props.reservationToEdit.stayLength;
      specialRequests1 = props.reservationToEdit.specialRequests;
    }
    const submitButton = async (e) => {
      e.preventDefault();

      // On submit of the form, send a POST request with the data to the server.

      let data = {
        reservationID: reservationID1,
        employeeID: employeeID,
        customerID: customerID,
        checkInDate: checkInDate,
        stayLength: stayLength,
        specialRequests: specialRequests,
      };
      const response = await fetch("http://flip2.engr.oregonstate.edu:9100/updatereservation", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        alert("Successfully updated the Reservation!");
        loadReservations();
      } else {
        alert(
          `Failed to update the reservation, status code = ${response.status}`
        );
        loadReservations();
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Reservation {reservationID1}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Customer</h4>
          <input value={customerID1} className="greyedOut"></input>
          <select onChange={(e) => setCustomerID(e.target.value)}>
            <option value="0"></option>
            {customerList?.map((item) => {
              return (
                <option
                  key={item}
                  value={item.customerID}
                  selected={item.customerID === customerID}
                >
                  {item.firstName} {item.lastName}
                </option>
              );
            })}
          </select>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedCustomerID === false) {
                setCheckedCustomerID(true);
                if (props.reservationToEdit) {
                  setCustomerID(customerID1);
                }
              } else {
                setCheckedCustomerID(false);
                setCustomerID(0);
              }
            }}
          ></input>
          <h4>Employee</h4>
          <input value={employeeID1} className="greyedOut"></input>
          <select onChange={(e) => setEmployeeID(e.target.value)}>
            <option value="0"></option>
            {employeeList?.map((item) => {
              return (
                <option
                  key={item}
                  value={item.employeeID}
                  selected={item.employeeID === employeeID}
                >
                  {item.firstName} {item.lastName}
                </option>
              );
            })}
          </select>

          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedEmployeeID === false) {
                setCheckedEmployeeID(true);
                if (props.reservationToEdit) {
                  setEmployeeID(employeeID1);
                }
              } else {
                setCheckedEmployeeID(false);
                setEmployeeID(0);
              }
            }}
          ></input>
          <h4>Check-In Date</h4>
          <input value={checkInDate1} className="greyedOut"></input>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedCheckInDate === false) {
                setCheckedCheckInDate(true);
                if (props.reservationToEdit) {
                  setCheckInDate(checkInDate1);
                }
              } else {
                setCheckedCheckInDate(false);
                setCheckInDate(0);
              }
            }}
          ></input>
          <h4>Stay Length</h4>
          <input value={stayLength1} className="greyedOut"></input>
          <input
            type="number"
            value={stayLength}
            onChange={(e) => setStayLength(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedStayLength === false) {
                setCheckedStayLength(true);
                if (props.reservationToEdit) {
                  setStayLength(stayLength1);
                }
              } else {
                setCheckedStayLength(false);
                setStayLength(0);
              }
            }}
          ></input>
          <h4> Special Requests</h4>
          <input value={specialRequests1} className="greyedOut"></input>
          <input
            type="text"
            onChange={(e) => setSpecialRequests(e.target.value)}
            value={specialRequests}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedSpecialRequests === false) {
                setCheckedSpecialRequests(true);
                if (props.reservationToEdit) {
                  setSpecialRequests(specialRequests1);
                }
              } else {
                setCheckedSpecialRequests(false);
                setSpecialRequests(0);
              }
            }}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              submitButton(e);
              props.onHide();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const onDelete = async (reservationToDelete) => {
    setReservationToDelete(reservationToDelete);
    setModalShowRemove(true);
    loadReservations();
  };

  function RemoveReservationModal(props) {
    let reservationID = 0;
    let customerID = 0;
    let checkInDate = 0;
    if (props.reservationToDelete) {
      reservationID = props.reservationToDelete.reservationID;
      customerID = props.reservationToDelete.customerID;
      checkInDate = props.reservationToDelete.checkInDate;
    }

    const submitButton = async (e) => {
      e.preventDefault();

      // On submit of the form, send a DELETE request with the ID to the server.
      let data = {
        reservationID: reservationID,
      };

      const response = await fetch("http://flip2.engr.oregonstate.edu:9100/deletereservation", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        alert("Successfully deleted the Reservation!");
        loadReservations();
      } else {
        alert(
          `Failed to delete the reservation, status code = ${response.status}`
        );
        loadReservations();
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {" "}
            Are you sure you want to delete this reservation: ID #
            {reservationID}, Customer ID #{customerID}, checking in on{" "}
            {checkInDate}?{" "}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              submitButton(e);
              props.onHide();
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const onEdit = async (reservationToEdit) => {
    setReservationToEdit(reservationToEdit);
    setModalShowUpdate(true);
  };

  return (
    <div>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
      <button className="crud-buttons" onClick={() => setModalShowSearch(true)}>
        Search
      </button>
      <SearchModal
        show={modalShowSearch}
        onHide={() => setModalShowSearch(false)}
      />
      <ReservationList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        onEdit={onEdit}
        onDelete={onDelete}
        reservations={reservations}
      ></ReservationList>
      <UpdateModal
        reservationToEdit={reservationToEdit}
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
      />
      <RemoveReservationModal
        reservationToDelete={reservationToDelete}
        show={modalShowRemove}
        onHide={() => setModalShowRemove(false)}
      />
    </div>
  );
}

export default Reservations;
