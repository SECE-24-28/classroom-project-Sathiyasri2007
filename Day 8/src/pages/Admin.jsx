import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const { globalTransactions } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecharges: 0,
    totalRevenue: 0,
    totalCashback: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('globalTransactions:', globalTransactions);
    // Calculate statistics from actual recharge data
    const totalRecharges = globalTransactions.length;
    const totalRevenue = globalTransactions.reduce((sum, recharge) => sum + (recharge.amount || 0), 0);
    const totalCashback = globalTransactions.reduce((sum, recharge) => sum + (recharge.cashback || 0), 0);

    console.log('totalRecharges:', totalRecharges, 'totalRevenue:', totalRevenue, 'totalCashback:', totalCashback);

    // For demo purposes, set totalUsers to a mock value since user data isn't stored
    // In a real app, this would come from a users database
    setStats({
      totalUsers: 1250, // Mock data
      totalRecharges,
      totalRevenue,
      totalCashback
    });

    // Set recent transactions from actual recharge history
    // Transform the data to match the display format
    const transactions = globalTransactions.slice(-5).reverse().map((recharge, index) => ({
      id: recharge.id || index + 1,
      user: recharge.userName || recharge.mobileNumber || 'Unknown User', // Use userName if available, otherwise mobile number
      amount: recharge.amount || 0,
      operator: recharge.operator || 'Unknown',
      date: recharge.date || new Date().toISOString().split('T')[0],
      status: recharge.status || 'Success'
    }));

    console.log('transactions:', transactions);
    setRecentTransactions(transactions);

    // Extract unique users from actual recharge data
    const uniqueUsers = [];
    const userMap = new Map();

    globalTransactions.forEach((transaction) => {
      const mobile = transaction.mobile;
      if (!userMap.has(mobile)) {
        userMap.set(mobile, {
          id: userMap.size + 1,
          name: transaction.userName || 'Unknown User',
          email: `${mobile}@example.com`, // Mock email based on mobile
          mobile: mobile,
          status: 'Active',
          joinDate: transaction.date
        });
      }
    });

    setUsers(Array.from(userMap.values()));
  }, [globalTransactions]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-light p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-secondary">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-primary text-light px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary">
            <h3 className="text-lg font-semibold text-secondary mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-accent">
            <h3 className="text-lg font-semibold text-secondary mb-2">Total Recharges</h3>
            <p className="text-3xl font-bold text-primary">{stats.totalRecharges.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-secondary">
            <h3 className="text-lg font-semibold text-secondary mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-primary">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-accent">
            <h3 className="text-lg font-semibold text-secondary mb-2">Total Cashback</h3>
            <p className="text-3xl font-bold text-primary">₹{stats.totalCashback.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transaction History */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-4 bg-light rounded-lg">
                  <div>
                    <p className="font-semibold text-secondary">{transaction.user}</p>
                    <p className="text-sm text-gray-600">{transaction.operator} - ₹{transaction.amount}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Management Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-primary mb-4">User Management</h2>
              <p className="text-secondary mb-4">Manage user accounts and permissions.</p>
              <button
                onClick={() => setShowUsers(!showUsers)}
                className="bg-primary text-light px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                {showUsers ? 'Hide Users' : 'View Users'}
              </button>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-primary mb-4">System Settings</h2>
              <p className="text-secondary mb-4">Configure system preferences and options.</p>
              <button className="bg-primary text-light px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors">
                Settings
              </button>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-primary mb-4">Support Tickets</h2>
              <p className="text-secondary mb-4">Handle customer support requests.</p>
              <button className="bg-primary text-light px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors">
                View Tickets
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {showUsers && (
          <div className="bg-white rounded-lg p-6 shadow-md mt-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">Users List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-light">
                    <th className="px-4 py-2 text-left text-secondary font-semibold">ID</th>
                    <th className="px-4 py-2 text-left text-secondary font-semibold">Name</th>
                    <th className="px-4 py-2 text-left text-secondary font-semibold">Email</th>
                    <th className="px-4 py-2 text-left text-secondary font-semibold">Mobile</th>
                    <th className="px-4 py-2 text-left text-secondary font-semibold">Status</th>
                    <th className="px-4 py-2 text-left text-secondary font-semibold">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200">
                      <td className="px-4 py-2 text-secondary">{user.id}</td>
                      <td className="px-4 py-2 text-secondary font-medium">{user.name}</td>
                      <td className="px-4 py-2 text-secondary">{user.email}</td>
                      <td className="px-4 py-2 text-secondary">{user.mobile}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-secondary">{user.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
