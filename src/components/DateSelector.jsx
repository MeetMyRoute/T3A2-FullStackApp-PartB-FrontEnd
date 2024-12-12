import React, { useState } from "react";
import DatePicker from "react-datepicker";

// Import CSS for styling
import "react-datepicker/dist/react-datepicker.css";

export function DateSelector({startDate, endDate, onDateChange}) {
    const [validationMessage, setValidationMessage] = useState("");

    const handleStartDateChange = (date) => {
        // Clear validation message on valid selection
        setValidationMessage("");
        if (endDate && date > endDate) {
            setValidationMessage("End date must be after the start date");

            // Reset endDate if it's before the new startDate
            onDateChange(date, null);
        } else {

            // Update dates in parent
            onDateChange(date, endDate);
        }
    }

    const handleEndDateChange = (date) => {
        setValidationMessage("");
        if (startDate && date < startDate) {
            setValidationMessage("End date must be after the start date");
        } else {
            onDateChange(startDate, date);
        }
    }

    return (
        <div>
           <div>
            <label>Start Date:</label>
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}

                // Disables past dates
                minDate={new Date()}
                placeholderText="Select start date"

                // Adds a clear button
                isClearable
            />
           </div>
           <div>
            <label>End Date:</label>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}

                // Ensure endDate is on or after startDate
                minDate={startDate}
                placeholderText="Select end date"
                isClearable
            />
           </div>

           {/* Display the validation message if any */}
           <p>{validationMessage}</p>
        </div>
    )
}