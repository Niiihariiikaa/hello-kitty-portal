import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/upload-message', 
        { content: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Message uploaded');
      setMessage('');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Message</h2>
      <textarea value={message} onChange={e => setMessage(e.target.value)} /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Dashboard;
