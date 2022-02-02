import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import { Link } from "react-router-dom";
import Rooms from "./Components/Rooms";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Customers from "./Components/Customers";
import Employees from "./Components/Employees";
import Reservations from "./Components/Reservations";
import Invoices from "./Components/Invoices";
import RoomsReservations from "./Components/RoomReservations";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <body id="body">
          <Router>
            <Routes>
              <Route path="/" exact element={<HomePage></HomePage>}></Route>
              <Route path="/rooms" exact element={<Rooms></Rooms>}></Route>
              <Route
                path="/customers"
                exact
                element={<Customers></Customers>}
              ></Route>
              <Route
                path="/employees"
                exact
                element={<Employees></Employees>}
              ></Route>
              <Route
                path="/Reservations"
                exact
                element={<Reservations></Reservations>}
              ></Route>
              <Route
                path="/invoices"
                exact
                element={<Invoices></Invoices>}
              ></Route>
              <Route
                path="/roomsreservations"
                exact
                element={<RoomsReservations></RoomsReservations>}
              ></Route>
            </Routes>
          </Router>
        </body>
      </header>
    </div>
  );
}

export default App;
