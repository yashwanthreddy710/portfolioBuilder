import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [slug, setSlug] = useState('');

  const fetchPortfolio = async () => {
    try {
      const res = await API.get('/portfolio/me');
      if (res.data && res.data.slug) {
        setHasPortfolio(true);
        setSlug(res.data.slug);
      }
    } catch (err) {
      setHasPortfolio(false);
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
    else fetchPortfolio();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>

      <div className="bg-gray-800 p-6 rounded shadow text-center">
        {!hasPortfolio ? (
          <>
            <p className="mb-4">You haven’t created your portfolio yet.</p>
            <button
              onClick={() => navigate('/editor')}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Create Portfolio
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">You already have a portfolio.</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/editor')}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Portfolio
              </button>
              <button
                onClick={() => navigate(`/portfolio/${slug}`)}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
              >
                Preview Portfolio
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}