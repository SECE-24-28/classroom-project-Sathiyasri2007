import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signup({ name: formData.name, email: formData.email, password: formData.password });
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      navigate('/plans');
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light py-10 px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-secondary whitespace-nowrap mb-3">
            Create your account
          </h2>
          <p className="text-center text-lg text-primary">
            Start recharging with us today
          </p>
        </div>
        
        <form className="space-y-5 bg-accent p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg font-semibold text-secondary">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-4 py-3 text-base border border-gray-300 placeholder-gray-500 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-semibold text-secondary">
              Email address
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-4 py-3 text-base border border-gray-300 placeholder-gray-500 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-lg font-semibold text-secondary">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-4 py-3 text-base border border-gray-300 placeholder-gray-500 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-lg font-semibold text-secondary">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-4 py-3 text-base border border-gray-300 placeholder-gray-500 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-md text-light bg-primary hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary transition-all"
            >
              Signup
            </button>
          </div>
          
          <div className="text-center pt-3">
            <p className="text-base text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-secondary transition-colors">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;