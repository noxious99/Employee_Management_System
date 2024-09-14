import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        textAlign: "center",
        border: "1px solid black",
        padding: "20px 0px 0px 0px",
      }}
    >
      <div
        style={{
          backgroundColor: "grey",
          color: "black",
          textDecoration: "none",
          width: "100%",
          padding: "10px 0px 10px 0px",
          textAlign: "center",
          border: "1px solid black",
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/addemployee"
          style={{ color: "black", textDecoration: "none" }}
        >
          ADD EMPLOYEE
        </Link>
      </div>

      <div
        style={{
          backgroundColor: "grey",
          color: "black",
          textDecoration: "none",
          width: "100%",
          padding: "10px 0px 10px 0px",
          textAlign: "center",
          border: "1px solid black",
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/"
          style={{ color: "black", textDecoration: "none" }}
        >
          EMPLOYEE
        </Link>
      </div>
    </div>
  );
};
