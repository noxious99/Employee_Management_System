import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../components/Navbar";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';

export const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("photo", photo);
    formData.append("dob", startDate);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Employee added successfully:", response.data);
      // Clear form after successful submission
      setName("");
      setEmail("");
      setMobile("");
      setPhoto(null);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
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
            <PersonAddIcon sx={{fontSize: 40}}/>
            <h2>Add Employee</h2>{" "}
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
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
            <div style={{display: "flex", alignItems: "center"}}>
            <span style={{padding: "0px 10px 0px 0px"}}><EventNoteIcon sx={{fontSize: 30}}/></span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              style={{width: "200px"}}
            />
            </div>
            <button className="buttonBasic">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
};
