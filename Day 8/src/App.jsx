import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlanProvider } from './context/PlanContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RechargePlans from './pages/RechargePlans';
import Payment from './pages/Payment';
import History from './pages/History';
import Success from './pages/Success';
import Admin from './pages/Admin';

import Dashboard from './pages/Dashboard';
import TestConnection from './pages/TestConnection';

function App() {
  return (
    <AuthProvider>
      <PlanProvider>
      <Router>
        <Routes>
          {/* Admin routes - standalone pages without main layout */}
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />

          {/* Main app routes - with sidebar and navbar */}
          <Route path="/*" element={
            <div className="min-h-screen flex bg-light">
              <Sidebar />
              <div className="flex-1 flex flex-col md:ml-64">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/plans" element={<RechargePlans />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/test" element={<TestConnection />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          } />
        </Routes>
      </Router>
      </PlanProvider>
    </AuthProvider>
  );
}

export default App;