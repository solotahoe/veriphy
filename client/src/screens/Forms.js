import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //create states to store the userinput
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setphoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [user, users] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // USING POST METHOD TO SEND DATA TO THE DATABASE START
  const sendData = async () => {
    try {
      const data = await axios.post(
        "https://verifyapicalls.herokuapp.com/users/register",
        {
          FirstName,
          LastName,
          email,
          PhoneNumber,
          OTP,
        }
      );
      //console.log(data);
      const NameId = data.data._id;
      navigate(`/dashboard/${NameId}`);
    } catch (error) {
      setError("Unable to register details try again");
      navigate("/");
    }
  };
  // USING POST METHOD TO SEND DATA TO THE DATABASE END
  return (
    <div>
      <body className="form-v9">
        <div className="page-content">
          <div className="form-v9-content">
            {/* REGISTRATION FORM START HERE */}
            <div className="form-detail">
              <h2>Registration Form</h2>
              <div className="form-row-total">
                <div className="form-row">
                  <input
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="input-text"
                    placeholder="Your First Name"
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input-text"
                    placeholder="Your Last Name"
                    required
                  />
                </div>
              </div>

              <div className="form-row-total">
                <div className="form-row">
                  <input
                    type="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="input-text"
                    placeholder="Your Email Address"
                    required
                    pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                  />
                </div>
                <div className="form-row">
                  <input
                    type="number"
                    name="comfirm-password"
                    id="comfirm-password"
                    className="input-text"
                    onChange={(e) => {
                      setphoneNumber(e.target.value);
                    }}
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>
              <div className="form-row-total">
                <div className="form-row">
                  <input
                    type="Number"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                    className="input-text"
                    placeholder="Your OTP"
                    required
                  />
                </div>
              </div>
              <div className="form-row-last">
                <input
                  type="submit"
                  name="register"
                  className="register"
                  value="Register"
                  onClick={sendData}
                />
              </div>
            </div>
          </div>
          {/* REGISTRATION FORM START HERE */}
        </div>
      </body>
    </div>
  );
}
