import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import { History } from './pages/History';
import Stats from './pages/Stats';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/game" element={<Game />} />
      <Route path="/history" element={<History />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}