import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Contacts() {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your logic here to handle form submission, like sending data to a server
    // For now, let's just navigate to the confirmation page
    navigate('/request-conformation');
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            placeholder='Your name'
            required
          />
        </div>
        <div className='form-control'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            placeholder='Your address'
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor='text-area'>Please Provide Your Request:</label>
          <textarea
            name='text-area'
            placeholder='Please provide your request'
            id='text-area'
            cols='30'
            rows='10'
            required></textarea>
        </div>
        <div className='button-container'>
          <button type='submit'>Submit Request</button>
        </div>
      </form>
      {/* Social media links */}
      <div className='social-media-links'>
        <p>Follow us on social media:</p>
        <ul>
          <li>
            <a
              href='https://www.example.com/facebook'
              target='_blank'
              rel='noopener noreferrer'>
              Facebook
            </a>
          </li>
          <li>
            <a
              href='https://www.example.com/twitter'
              target='_blank'
              rel='noopener noreferrer'>
              Twitter
            </a>
          </li>
          <li>
            <a
              href='https://www.example.com/linkedin'
              target='_blank'
              rel='noopener noreferrer'>
              LinkedIn
            </a>
          </li>
          {/* Add more social media links as needed */}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
