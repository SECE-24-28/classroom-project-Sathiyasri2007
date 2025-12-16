import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-light p-2 rounded-md"
      >
        Menu
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-accent text-white transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>

        <div className="bg-accent h-16 w-full flex items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-light w-8 h-8 rounded-full flex items-center justify-center font-bold">
              M
            </div>
            <h2 className="text-xl font-bold text-white">Menu</h2>
          </div>
        </div>
        <div className="p-6">
          
          <nav className="space-y-4">
            <Link
              to="/"
              className="block py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/plans"
              className="block py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Recharge Plans
            </Link>
            
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="block py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn && (
              <Link
                to="/history"
                className="block py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                History
              </Link>
            )}


            
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 px-4 rounded hover:bg-secondary hover:text-light transition-colors"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;