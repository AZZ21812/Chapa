import React, { useState } from 'react';
import './Paymentform.css'; // Import CSS file for component styling
import axios from 'axios';

export default function Paymentform() {
  // State variables to hold the amount, currency, and confirmation flag
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD'); // Default currency
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    // Initialize with empty values for your form fields
    amount: '',
    currency: ''
  });

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle payment logic
    setShowConfirmation(true); // Show confirmation modal
    setFormSubmitted(true); // Set formSubmitted to true
    // Make a POST request using Axios
  };

  // Function to handle confirmation
  const handleConfirm = () => {
    // Here you can perform any necessary payment confirmation logic
    console.log('Payment confirmed:', { amount, currency });
    setShowConfirmation(false); // Hide confirmation modal
    setFormSubmitted(false);
    setLoading(true); // Set loading state to true
    axios.post("http://192.168.1.102:8000/api/pay", formData)
      .then((response) => {
        // Handle success response
        console.log('Response:', response.data);
        const url = response.data; // Assuming the response contains a URL
        // Simulate loading for 2 seconds (you can replace this with actual loading code)
        setTimeout(() => {
          window.location.href = url;
          setLoading(false); // Set loading state to false after URL loads
        }, 2000);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        setLoading(false); // Set loading state to false if there's an error
      });
  };

  return (
    <div className="payment-form-container">
      {!formSubmitted && !showConfirmation && (
        <form onSubmit={handleSubmit} className={`payment-form ${loading ? 'hide' : ''}`} style={{ width: '25vw' }}>
          <h4>Chapa Transaction App</h4>
          <div className="form-group" style={{ display: 'flex' }}>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ width: 300, marginLeft: '10px' }}
            />
          </div>
          <div className="form-group" style={{ display: 'flex' }}>
            <label htmlFor="currency">Currency:</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
              style={{ width: '100%' }}
            >
              <option value="USD">USD</option>
              <option value="ETB">ETB</option>
            </select>
          </div>
          <button type="submit">Pay</button>
        </form>
      )}

      {showConfirmation && (
        <div className="modal-wrapper" style={{ backgroundColor: '#353a45', padding: 30 }}>
          <div className="modal" style={{ backgroundColor: '#272c36', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <h3>Confirm Payment</h3>
            <p>
              Please confirm the payment of <br /> {amount} {currency}.
            </p>
            <div style={{ width: '80%', display: 'flex', gap: '30px' }}>
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Loading animation */}
      {loading && (
        <div className="loading-screen">
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
