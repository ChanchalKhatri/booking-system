"use client";

import React, { useState, useEffect } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]); // State for bookings
  const [showBookings, setShowBookings] = useState(false); // Toggle between add and show views

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking successfully saved!");
        setFormSubmitted(true);
      } else {
        alert(result.error || "Failed to save booking.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Fetch bookings from the backend
  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const result = await response.json();

      if (response.ok) {
        setBookings(result); // Store bookings in state
      } else {
        alert("Failed to fetch bookings.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching bookings.");
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking deleted successfully!");
        window.location.reload();
        fetchBookings(); // Refresh the bookings list after deletion
      } else {
        alert(result.error || "Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle "Show Bookings" button click
  const handleShowBookings = () => {
    setShowBookings(true);
    fetchBookings(); // Fetch bookings when showing the list
  };

  // Handle "Add Booking" button click
  const handleAddBooking = () => {
    setShowBookings(false);
  };

  if (formSubmitted) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Thank You!</h2>
        <p style={styles.paragraph}>Your booking has been confirmed. 🎉</p>
      </div>
    );
  }

  return (
    <section style={styles.section}>
      <div style={styles.formContainer}>
        {/* Toggle Buttons */}
        <div style={styles.toggleButtons}>
          <button
            onClick={handleAddBooking}
            style={{
              ...styles.toggleButton,
              backgroundColor: showBookings ? "#ddd" : "#ff9900",
            }}
          >
            Add Booking
          </button>
          <button
            onClick={handleShowBookings}
            style={{
              ...styles.toggleButton,
              backgroundColor: showBookings ? "#ff9900" : "#ddd",
            }}
          >
            Show Bookings
          </button>
        </div>

        {/* Add Booking Form */}
        {!showBookings && (
          <>
            <h2 style={styles.heading}>Reserve Your Table</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="phone" style={styles.label}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="guests" style={styles.label}>
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="date" style={styles.label}>
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="time" style={styles.label}>
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.fullWidth}>
                <button type="submit" style={styles.button}>
                  Reserve Now
                </button>
              </div>
            </form>
          </>
        )}

        {/* Show Bookings List */}
        {showBookings && (
          <>
            <h2 style={styles.heading}>Your Bookings</h2>
            {bookings.length > 0 ? (
              <ul style={styles.bookingList}>
                {bookings.map((booking, index) => (
                  <li key={index} style={styles.bookingItem}>
                    <strong>Name:</strong> {booking.name} <br />
                    <strong>Email:</strong> {booking.email} <br />
                    <strong>Phone:</strong> {booking.phone} <br />
                    <strong>Date:</strong> {booking.date} <br />
                    <strong>Time:</strong> {booking.time} <br />
                    <strong>Guests:</strong> {booking.guests} <br />
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// Updated Styles
const styles = {
  section: {
    backgroundColor: "#f7f7f7",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    maxWidth: "600px",
    width: "100%",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#ff9900",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    textAlign: "center",
    gridColumn: "span 2", // Full width button
  },
  fullWidth: {
    gridColumn: "span 2",
  },
  paragraph: {
    fontSize: "1rem",
    textAlign: "center",
    marginTop: "1rem",
  },
  toggleButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  toggleButton: {
    flex: 1,
    padding: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginRight: "10px",
  },
  bookingList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  bookingItem: {
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default Booking;
