import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Admin credentials (in real app, this would come from backend API)
      const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.username === ADMIN_CREDENTIALS.username && 
          formData.password === ADMIN_CREDENTIALS.password) {
        
        // Store admin session
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', formData.username);
        localStorage.setItem('adminToken', 'admin-auth-token-' + Date.now());
        
        // Redirect to admin dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      {/* Header */}
      <header className="bg-primary text-light py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Mobile Recharge Admin</h1>
              <p className="text-accent text-sm">Secure Admin Portal</p>
            </div>
            <Link 
              to="/"
              className="bg-accent text-secondary px-4 py-2 rounded-lg font-semibold hover:bg-secondary hover:text-light transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-accent rounded-xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-primary text-center py-8">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-primary">Lock</span>
              </div>
              <h2 className="text-3xl font-bold text-light">Admin Login</h2>
              <p className="text-accent mt-2">Access the admin dashboard</p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <div className="flex items-center">
                    <span className="mr-2">Warning</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Demo Credentials Banner */}
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center">
                  <span className="mr-2">Info</span>
                  <div>
                    <p className="font-semibold">Demo Credentials</p>
                    <p className="text-sm">Username: <strong>admin</strong> | Password: <strong>admin123</strong></p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-secondary mb-2">
                    Admin Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Enter admin username"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-secondary mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Enter password"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-lg text-xl font-semibold transition-all ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-light hover:bg-secondary hover:shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Authenticating...
                      </div>
                    ) : (
                      'Login to Admin Dashboard'
                    )}
                  </button>
                </div>
              </form>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center space-y-3">
                  <p className="text-secondary">
                    Forgot your password?{' '}
                    <button 
                      onClick={() => alert('Please contact system administrator.')}
                      className="text-primary hover:text-secondary font-semibold transition-colors"
                    >
                      Reset Password
                    </button>
                  </p>
                  
                  <p className="text-secondary">
                    Are you a regular user?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:text-secondary font-semibold transition-colors"
                    >
                      User Login
                    </Link>
                  </p>
                  
                  <p className="text-secondary">
                    Need help?{' '}
                    <button 
                      onClick={() => alert('Contact: support@rechargeapp.com')}
                      className="text-primary hover:text-secondary font-semibold transition-colors"
                    >
                      Contact Support
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Warning: This is a secure admin portal. Unauthorized access is prohibited.</p>
            <p className="mt-1">Your activity will be logged for security purposes.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-light py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Mobile Recharge Admin Portal. All rights reserved.</p>
          <p className="text-accent text-sm mt-1">v1.0.0 | Secure Admin Access</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLoginPage;