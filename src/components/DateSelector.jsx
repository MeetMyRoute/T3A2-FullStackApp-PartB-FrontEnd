import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../stylesheets/DatePicker.css";

export function DateSelector({ startDate, endDate, onDateChange }) {
    const [validationMessage, setValidationMessage] = useState("");

    // Handle start date change
    const handleStartDateChange = (date) => {
        setValidationMessage("");
        if (endDate && date > endDate) {
            setValidationMessage("End date must be after the start date");
            // Reset end date if invalid
            onDateChange(date, null);
        } else {
            onDateChange(date, endDate);
        }
    }

    // Handle end date change
    const handleEndDateChange = (date) => {
        setValidationMessage("");
        if (startDate && date < startDate) {
            setValidationMessage("End date must be after the start date");
        } else {
            onDateChange(startDate, date);
        }
    }

    return (
        <div className="date-selector">
            {/* Start date picker */}
            <div className="date-picker-container">
                <label htmlFor="start-date" className="date-label">Start Date:</label>
                <DatePicker
                    id="start-date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    // Prevent past dates
                    minDate={new Date()}
                    placeholderText="Select start date"
                    // Allow clearing the date
                    isClearable
                />
            </div>

            {/* End date picker */}
            <div className="date-picker-container">
                <label htmlFor="end-date" className="date-label">End Date:</label>
                <DatePicker
                    id="end-date"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    // Ensure end date is on or after start date
                    minDate={startDate}
                    placeholderText="Select end date"
                    isClearable
                />
            </div>

            {/* Validation message */}
            {validationMessage && (
                <p className="validation-message">{validationMessage}</p>
            )}
        </div>
    )
}