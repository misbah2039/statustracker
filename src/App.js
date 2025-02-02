import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { attendanceData } from "./attendanceData";
import { billData } from "./billData";

function StatusChecker() {
  const fileData = {
    Attendance: attendanceData,
    Bill: billData,
  };

  const [selectedFile, setSelectedFile] = useState("Bill");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("December");
  const [resetAnimationKey, setResetAnimationKey] = useState(0);
  const [visitorCount, setVisitorCount] = useState(null); // State to hold visitor count

  // Function to update the counter on the backend
  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        const response = await axios.post("http://localhost:5000/counter");
        console.log("Visitor count response:", response.data);
        setVisitorCount(response.data.count);
      } catch (error) {
        console.error("Error updating visitor count:", error);
      }
    };

    updateVisitorCount();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);
    setResetAnimationKey((prev) => prev + 1); // Triggers animation reset
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setResetAnimationKey((prev) => prev + 1); // Triggers animation reset
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setResetAnimationKey((prev) => prev + 1); // Triggers animation reset
  };

  const statusData =
    fileData[selectedFile]?.[selectedYear]?.[selectedMonth] || [];

  const modifiedStatusData = [...statusData];
  let firstIncompleteFound = false; // Track the first "false" completed status
  const hasCompletedStatus = modifiedStatusData.some(
    (status) => status.completed
  ); // Check if there's at least one true status

  return (
    <div className="status-checker-container">
      <h2>Status Checker</h2>
      <p>Last update on 24 January 2025</p>

      {/* File Type Selection */}
      <div className="file-selector">
        <label>Select File Type:</label>
        <select value={selectedFile} onChange={handleFileChange}>
          <option value="Attendance">Attendance File</option>
          <option value="Bill">Bill File</option>
        </select>
      </div>

      {/* Year Selection */}
      <div className="year-selector">
        <label>Select Year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* Month Selection */}
      <div className="month-selector">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Horizontal line */}
      <hr className="divider" />

      {/* Display Status Data */}
      <ul className="status-list">
        {modifiedStatusData.length > 0 ? (
          modifiedStatusData.map((status, index) => {
            // Determine if this is the first "false" completed status
            const showReachedText =
              !status.completed && !firstIncompleteFound && hasCompletedStatus;
            if (showReachedText) firstIncompleteFound = true;

            return (
              <li
                key={`${status.name}-${resetAnimationKey}-${index}`} // Ensures key changes on reset, includes index to make it unique
                className={`status-item ${
                  status.completed ? "completed" : "pending"
                }`}
                style={{
                  animationDelay: `${index * 0.5}s`, // Delays each item by 0.5 seconds
                }}
              >
                <span className="status-stage">{status.name}</span>
                <div className="status-icon">
                  {status.completed ? (
                    "✓"
                  ) : (
                    <>
                      {showReachedText && (
                        <span className="reached-text">(Reached Here...)</span>
                      )}{" "}
                      ✗{" "}
                    </>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <p>No data available for the selected month and year.</p>
        )}
      </ul>
      {/* Visitor Count */}
      <span style={{ color: "white", display: "block", textAlign: "center" }}>
        Visitor Count:{" "}
        {visitorCount !== null ? visitorCount : "Loading visitor count..."}
      </span>
    </div>
  );
}

export default StatusChecker;
