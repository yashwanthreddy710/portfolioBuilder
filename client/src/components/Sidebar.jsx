import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiEdit, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
      location.pathname === path ? 'bg-gray-700' : ''
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-4 hidden md:block">
      <h2 className="text-white text-2xl font-bold mb-6">Portfolio Builder</h2>
      <nav className="space-y-2 text-gray-300">
        <Link to="/dashboard" className={linkClass('/dashboard')}>
          <FiHome /> <span>Dashboard</span>
        </Link>
        <Link to="/editor" className={linkClass('/editor')}>
          <FiEdit /> <span>Edit Portfolio</span>
        </Link>

        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 w-full text-left rounded-lg hover:bg-red-600 transition text-red-400 mt-8"
        >
          <FiLogOut /> <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}