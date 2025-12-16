import { useState, useEffect } from 'react';
import { transactionAPI } from '../services/api';
import { usePlans } from '../context/PlanContext';

const Dashboard = () => {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  const [transactions, setTransactions] = useState([]);
  const { plans, addPlan, updatePlan, deletePlan } = usePlans();
  const [newPlan, setNewPlan] = useState({ name: '', price: '', validity: '' });
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchTransactions();
    }
  }, [isAdminLoggedIn]);

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price && newPlan.validity) {
      addPlan({ ...newPlan, price: Number(newPlan.price), category: 'prepaid' });
      setNewPlan({ name: '', price: '', validity: '' });
    }
  };

  const handleUpdatePlan = (id, updatedPlan) => {
    updatePlan(id, { ...updatedPlan, price: Number(updatedPlan.price) });
    setEditingPlan(null);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-light p-6 flex items-center justify-center">
        <div className="bg-accent p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">Access Denied</h2>
          <p className="text-secondary mb-4">Please login as admin to view dashboard</p>
          <a href="/login" className="bg-primary text-light px-6 py-2 rounded">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = '/login';
          }}
          className="bg-primary text-light px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Plan Management */}
      <div className="bg-accent p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-4">Manage Plans</h2>
        
        {/* Add New Plan */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input 
            placeholder="Plan Name" 
            value={newPlan.name}
            onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
            className="p-2 rounded"
          />
          <input 
            placeholder="Price" 
            type="number"
            value={newPlan.price}
            onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
            className="p-2 rounded"
          />
          <input 
            placeholder="Validity" 
            value={newPlan.validity}
            onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
            className="p-2 rounded"
          />
          <button onClick={handleAddPlan} className="bg-primary text-light p-2 rounded">Add Plan</button>
        </div>

        {/* Plans List */}
        <div className="space-y-2">
          {plans.map(plan => (
            <div key={plan.id} className="flex items-center justify-between bg-light p-4 rounded">
              {editingPlan === plan.id ? (
                <div className="flex gap-2 flex-1">
                  <input 
                    defaultValue={plan.name}
                    onBlur={(e) => handleUpdatePlan(plan.id, {...plan, name: e.target.value})}
                    className="p-1 rounded flex-1"
                  />
                  <input 
                    defaultValue={plan.price}
                    onBlur={(e) => handleUpdatePlan(plan.id, {...plan, price: e.target.value})}
                    className="p-1 rounded w-20"
                  />
                  <input 
                    defaultValue={plan.validity}
                    onBlur={(e) => handleUpdatePlan(plan.id, {...plan, validity: e.target.value})}
                    className="p-1 rounded w-24"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <span className="font-semibold">{plan.name}</span> - ₹{plan.price} - {plan.validity}
                </div>
              )}
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingPlan(editingPlan === plan.id ? null : plan.id)}
                  className="bg-secondary text-light px-3 py-1 rounded text-sm"
                >
                  {editingPlan === plan.id ? 'Save' : 'Edit'}
                </button>
                <button 
                  onClick={() => deletePlan(plan.id)}
                  className="bg-red-500 text-light px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-accent p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-secondary mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-light">
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Plan</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{tx.mobile}</td>
                  <td className="p-2">₹{tx.amount}</td>
                  <td className="p-2">{tx.plan}</td>
                  <td className="p-2">{new Date(tx.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
