import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostRoomPage from './pages/PostRoomPage';
import FindRoomPage from './pages/FindRoomPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import SavedPage from './pages/SavedPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostRoomPage />} />
          <Route path="/find" element={<FindRoomPage />} />
          <Route path="/rooms/:id" element={<RoomDetailsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
