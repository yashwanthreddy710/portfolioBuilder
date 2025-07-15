import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/forgot-password', { email });
      setMsg(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
      setMsg('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Reset Your Password</h2>
        {msg && <p className="text-green-500 text-sm mb-4">{msg}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded">Send Reset Link</button>
        <div className="text-sm text-gray-400 mt-4 text-center">
          <Link to="/" className="text-blue-400 hover:underline">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}