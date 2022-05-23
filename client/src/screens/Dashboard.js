import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurentUsers] = useState([]);
  const [value, setValue] = useState("");
  const [tableFileter, setTablefilter] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const params = useParams();

  // search code starts here
  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTablefilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setDataSource([...dataSource]);
    }
  };
  // search code ends here

  useEffect(() => {
    // get the list of all users when the page first loads start
    const Reusers = async () => {
      const data = await axios.get("http://127.0.0.1:5000/users");
      setUsers(data.data);
      setDataSource(data.data);
      //console.log(data.data);
    };
    // get the list of all users when the page first loads end

    // get the name of the current user when the page loads
    const curentUser = async () => {
      const userData = await axios.get(
        `http://127.0.0.1:5000/users/${params.id}`
      );
      setCurentUsers(userData.data.FirstName);
      console.log("userData.data.FirstName");
    };

    //invoke the functions
    Reusers();
    curentUser();
  }, []);

  return (
    <div className="homePagebg">
      {/* HEADER STARTS HERE */}
      <header className="header">
        <h3>Dashboard</h3>
        <h2>Hi, {currentUser}, Welcome</h2>
      </header>
      {/* HEADER ENDS HERE */}
      <div className="tables-section">
        <div className="row h4row">
          <h4>Client Details </h4>

          {/* search button code start here */}
          <nav class="navbar">
            <div class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={filterData}
                value={value}
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </div>
          </nav>
          {/* search button code ends here */}
        </div>
        <div>
          {/* TABLE STARTS HERE */}
          <table className="table table-striped darker" id="myTable">
            <thead>
              <tr>
                <th colspan="4">
                  <span className="bg-danger dangerbg">
                    Details: {users.length} entries available
                  </span>
                </th>
              </tr>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">PhoneNumber</th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFileter.map((user) => (
                    <tr key={user._id}>
                      <td>{user.FirstName}</td>
                      <td>{user.LastName}</td>
                      <td>{user.email}</td>
                      <td>{user.PhoneNumber}</td>
                    </tr>
                  ))
                : dataSource.map((user) => (
                    <tr key={user._id}>
                      <td>{user.FirstName}</td>
                      <td>{user.LastName}</td>
                      <td>{user.email}</td>
                      <td>{user.PhoneNumber}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {/* TABLE ENDS HERE */}
        </div>
        <div className="row footer">&copy; 2022 solo githira</div>
      </div>
    </div>
  );
}
