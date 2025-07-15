import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import PortfolioEditor from './pages/PortfolioEditor';
import PublicPortfolio from './pages/PublicPortfolio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor" element={<PortfolioEditor />} />
      <Route path="/portfolio/:slug" element={<PublicPortfolio />} />
    </Routes>
  );
}

export default App;

