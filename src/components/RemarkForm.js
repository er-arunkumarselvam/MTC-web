import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import { useNavigate } from 'react-router-dom';

const RemarkForm = ({ username, fleetNumber, token, date }) => {
  const [remarks, setRemarks] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setRemarks(value);
    setIsSubmitDisabled(value.length <= 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${CONFIG.URL}/form/submit`, {
        username,
        fleetNumber,
        remarks,
        date
      }, {
        headers: {
          'barrer ': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert('Form submitted successfully');
        navigate("/scanner");
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className='container-fluid remark-container'>
      <h3 className='form-title'>Inspection Form</h3>
      <form onSubmit={handleSubmit} className='remark-form'>
        <label htmlFor='remarks' className='form-label'>Remarks</label>
        <textarea name="remarks" id="remark" className='form-textarea' placeholder='Enter your comments' value={remarks} onChange={handleInputChange}></textarea>
        <small className='info-text'>*required to filled</small>
        <button type="submit" className='form-btn' disabled={isSubmitDisabled}>Submit</button>
      </form>
    </div>
  )
}

export default RemarkForm;
