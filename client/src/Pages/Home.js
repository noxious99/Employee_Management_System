import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { deleteEmployee, getEmployee } from "../actions/EmployeeAction";
import { Link } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Footer } from "../components/Footer";

export const Home = () => {
  const [page, setPage] = useState(0);
  const [pageNum, setPageNum] = useState(5);
  const [nameKey, setNameKey] = useState("");
  const [emailKey, setEmailKey] = useState("");
  const [mobileKey, setMobileKey] = useState("");
  const [dobKey, setDobKey] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getEmployee(page, sortField, order, {
        nameKey,
        emailKey,
        mobileKey,
        dobKey,
      })
    );
  }, [dispatch, page, sortField, order, nameKey, emailKey, mobileKey, dobKey]);

  const employees = useSelector((state) => state.getData.allData || []);
  const totalEmployees = useSelector((state) => state.getData.totalCount || []);
  const loading = useSelector((state) => state.getData.isLoading);

  const formatDOB = (dob) => {
    if (!dob) return "";
    const date = new Date(dob);
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  };

  useEffect(() => {
    if (employees) {
      const total = Math.ceil(totalEmployees / 5);
      setPageNum(total);
    }
  }, [employees]);

  const handlePagination = (event, value) => {
    setPage(value - 1);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page after search
    dispatch(
      getEmployee(0, sortField, order, { nameKey, emailKey, mobileKey, dobKey })
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="container">
        <div className="coloumn_one">
          <Navbar />
        </div>
        <div className="coloumn_two">
          <div className="search">
            <input
              type="text"
              placeholder="name"
              value={nameKey}
              onChange={(e) => setNameKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Date of Birth"
              value={dobKey}
              onChange={(e) => setDobKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              value={emailKey}
              onChange={(e) => setEmailKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="mobile"
              value={mobileKey}
              onChange={(e) => setMobileKey(e.target.value)}
            />
            <button onClick={handleSearch}>
              <PersonSearchIcon sx={{ fontSize: 40 }} />
            </button>
          </div>
          <div className="title">
            <h1>Employee List</h1>
          </div>
          <div
            className="employeeList"
            style={{ width: "85vw", padding: "15px" }}
          >
            {employees.length === 0 ? (
              <p>No employees found</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Photo
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Name{" "}
                      <button
                        onClick={() => {
                          setSortField("name");
                          setOrder(order === "asc" ? "desc" : "asc");
                        }}
                        className="buttonIcon"
                      >
                        <SwapVertIcon />
                      </button>
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Email
                      <button
                        onClick={() => {
                          setSortField("email");
                          setOrder(order === "asc" ? "desc" : "asc");
                        }}
                        className="buttonIcon"
                      >
                        <SwapVertIcon />
                      </button>
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Mobile{" "}
                      <button
                        onClick={() => {
                          setSortField("mobile");
                          setOrder(order === "asc" ? "desc" : "asc");
                        }}
                        className="buttonIcon"
                      >
                        <SwapVertIcon />
                      </button>
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Date of Birth{" "}
                      <button
                        onClick={() => {
                          setSortField("dob");
                          setOrder(order === "asc" ? "desc" : "asc");
                        }}
                        className="buttonIcon"
                      >
                        <SwapVertIcon />
                      </button>
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee._id}>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {employee.photo && (
                          <img
                            src={employee.photo}
                            alt={`${employee.name}'s photo`}
                            style={{ width: "50px" }}
                          />
                        )}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {employee.name}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {employee.email}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {employee.mobile}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {formatDOB(employee.dob)}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <Link
                          to={`/editdetails/${employee._id}`}
                          className="buttonIcon"
                        >
                          <EditNoteIcon sx={{ fontSize: 30 }} />
                        </Link>{" "}
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="buttonIcon"
                        >
                          <DeleteForeverIcon
                            sx={{ fontSize: 30, color: "error" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="pagination">
            <Stack spacing={4}>
              <Pagination
                count={pageNum}
                page={page + 1}
                variant="outlined"
                shape="rounded"
                color="success"
                onChange={handlePagination}
              />
            </Stack>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
