import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { transactionAPI } from '../services/api';

const History = () => {
  const { isLoggedIn, rechargeHistory, totalCashback } = useAuth();
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserTransactions();
    }
  }, [isLoggedIn]);

  const fetchUserTransactions = async () => {
    try {
      const response = await transactionAPI.getTransactions();
      setUserTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-secondary mb-4">Recharge History</h1>
        <div className="text-center mb-8">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
            Total Cashback Earned: ₹{totalCashback}
          </div>
        </div>
        
        <div className="bg-light rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Operator</th>
                  <th className="px-6 py-3 text-left">Mobile</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Plan</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Cashback</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-accent hover:bg-opacity-20">
                    <td className="px-6 py-4 text-primary">{record.date}</td>
                    <td className="px-6 py-4 text-primary">{record.operator}</td>
                    <td className="px-6 py-4 text-primary">{record.mobile}</td>
                    <td className="px-6 py-4 text-accent font-semibold">₹{record.amount}</td>
                    <td className="px-6 py-4 text-primary">{record.plan}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        record.status === 'Success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      {record.cashback ? `₹${record.cashback}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {userTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No recharge history found. Make your first recharge to see history!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;