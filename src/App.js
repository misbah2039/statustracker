import React, { useState } from "react";
import "./App.css";
import { attendanceData } from "./attendanceData";
import { billData } from "./billData";

function StatusChecker() {
  const fileData = {
    Attendance: attendanceData,
    Bill: billData,
  };

  const [selectedFile, setSelectedFile] = useState("Attendance");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");

  const handleFileChange = (e) => setSelectedFile(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const statusData =
    fileData[selectedFile]?.[selectedYear]?.[selectedMonth] || [];

  return (
    <div className="status-checker-container">
      <h2>Status Checker</h2>

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
        {statusData.length > 0 ? (
          statusData.map((status, index) => (
            <li
              key={index}
              className={`status-item ${
                status.completed ? "completed" : "pending"
              }`}
            >
              <span className="status-stage">{status.name}</span>
              <span className="status-icon">
                {status.completed ? "✓" : "✗"}
              </span>
            </li>
          ))
        ) : (
          <p>No data available for the selected month and year.</p>
        )}
      </ul>
    </div>
  );
}

export default StatusChecker;
