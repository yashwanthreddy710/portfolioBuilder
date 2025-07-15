import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      const res = await API.post('/auth/reset-password', {
        token,
        newPassword: form.newPassword
      });
      setMsg(res.data.message);
      setError('');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
      setMsg('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Set New Password</h2>
        {msg && <p className="text-green-500 text-sm mb-4">{msg}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          required
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded">Update Password</button>
        <div className="text-sm text-gray-400 mt-4 text-center">
          <Link to="/" className="text-blue-400 hover:underline">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
