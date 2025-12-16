import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (formData.role === 'admin') {
        if (formData.email === 'admin@admin.com' && formData.password === 'admin123') {
          localStorage.setItem('adminLoggedIn', 'true');
          navigate('/dashboard');
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        await login(formData);
        navigate("/plans");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-4">
      <div className="max-w-md w-full space-y-6">

        <h2 className="text-center text-4xl font-bold text-secondary">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-accent p-6 rounded-lg shadow-lg space-y-5"
        >
          <div>
            <label className="block text-secondary font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md border"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-secondary font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md border"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-secondary font-semibold">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-light rounded-md font-semibold"
          >
            Login
          </button>

          <p className="text-center text-secondary">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
