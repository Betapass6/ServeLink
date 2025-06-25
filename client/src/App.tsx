import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import BookingForm from './pages/BookingForm';
import DashboardBuyer from './pages/DashboardBuyer';
import DashboardSeller from './pages/DashboardSeller';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ReviewForm from './pages/ReviewForm';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/booking/:serviceId" element={<BookingForm />} />
        <Route path="/dashboard/buyer" element={<DashboardBuyer />} />
        <Route path="/dashboard/seller" element={<DashboardSeller />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/review/:bookingId" element={<ReviewForm />} />
      </Routes>
    </>
  );
}

export default App; 