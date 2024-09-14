import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { getEmployee, updateEmployee } from "../actions/EmployeeAction";
import { Navbar } from "../components/Navbar";


import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import EventNoteIcon from "@mui/icons-material/EventNote";

export const EditDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  const employees = useSelector((state) => state.getData.allData || []);

  const employee = Array.isArray(employees)
    ? employees.find((user) => user._id === id)
    : null;

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setMobile(employee.mobile);

      if (employee.dob) {
        const validDate = new Date(employee.dob);
        if (!isNaN(validDate)) {
          setStartDate(validDate);
        }
      }
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = {
      name,
      email,
      mobile,
      dob: startDate.toISOString(),
    };
    dispatch(updateEmployee(id, employeeData)).then(() => {
      dispatch(getEmployee(0, "createdAt", "asc", {}));
      setIsUpdated(true); // Set success state to true after update
      setTimeout(() => setIsUpdated(false), 3000);
    });
  };

  return (
    <div className="container">
      <div className="coloumn_one">
        <Navbar />
      </div>
      <div className="coloumn_two" style={{ width: "85vw", padding: "15px" }}>
        <div className="addForm">
          <div
            className="title"
            style={{ display: "flex", alignSelf: "flex-start" }}
          >
            <FaceRetouchingNaturalIcon sx={{ fontSize: 40 }} />
            <h2>Update Employee Details</h2>{" "}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ padding: "0px 10px 0px 0px" }}>
                <EventNoteIcon sx={{ fontSize: 30 }} />
              </span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                style={{ width: "200px" }}
              />
            </div>

            <button type="submit" className="buttonBasic">
              Update Employee
            </button>

            {isUpdated && (
              <p style={{ color: "green", marginTop: "10px" }}>
                Employee updated successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
