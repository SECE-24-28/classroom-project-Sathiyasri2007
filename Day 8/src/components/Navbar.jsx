import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout, totalCashback } = useAuth();

  return (
    <nav className="bg-secondary text-light p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-accent transition-colors">
          <div className="bg-accent text-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">
            Mobile Recharge
          </div>
          <span>MobileRecharge</span>
        </Link>
        <div className="space-x-2">
          <Link to="/" className="px-3 py-2 rounded bg-primary hover:bg-accent transition-colors">
            Home
          </Link>
          <Link to="/plans" className="px-3 py-2 rounded bg-primary hover:bg-accent transition-colors">
            Recharge Plans
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/history" className="px-3 py-2 rounded bg-primary hover:bg-accent transition-colors">
                History
              </Link>
              <div className="px-3 py-2 rounded bg-green-600 text-white">
                Cashback: ₹{totalCashback}
              </div>
              <button
                onClick={logout}
                className="bg-primary px-4 py-2 rounded hover:bg-accent hover:text-secondary transition-colors text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded bg-primary hover:bg-accent transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-3 py-2 rounded bg-primary hover:bg-accent transition-colors">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;