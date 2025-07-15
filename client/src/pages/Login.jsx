import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.userId, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center">
        Build your own portfolio folks ....
      </h1>

      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Your Account</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded">Login</button>
        <div className="text-sm text-gray-400 mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-400 hover:underline mr-2">Forgot password?</Link>
          | 
          <Link to="/register" className="text-blue-400 hover:underline ml-2">Register</Link>
        </div>
      </form>
    </div>
  );
}
