import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Success = () => {
  const location = useLocation();
  const { totalCashback } = useAuth();
  const { rechargeData } = location.state || {};

  if (!rechargeData) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center text-secondary">
          <h1 className="text-2xl mb-4">No recharge data found</h1>
          <Link to="/" className="bg-primary px-6 py-2 rounded text-light hover:bg-secondary transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center py-8">
      <div className="bg-accent rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="text-green-500 text-6xl mb-4">Success</div>
        <h1 className="text-2xl font-bold text-secondary mb-4">Recharge Successful!</h1>
        
        <div className="bg-light rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-secondary mb-2">Recharge Details:</h3>
          <div className="space-y-1 text-sm">
            <div><span className="font-medium">Mobile:</span> {rechargeData.mobile}</div>
            <div><span className="font-medium">Operator:</span> {rechargeData.operator}</div>
            <div><span className="font-medium">Plan:</span> {rechargeData.plan}</div>
            <div><span className="font-medium">Amount Paid:</span> ₹{rechargeData.amount}</div>
            {rechargeData.cashback && (
              <div className="text-green-600"><span className="font-medium">Cashback Earned:</span> ₹{rechargeData.cashback}</div>
            )}
          </div>
        </div>

        <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6">
          <div className="font-semibold">Total Cashback Balance</div>
          <div className="text-xl">₹{totalCashback}</div>
        </div>

        <div className="space-y-3">
          <Link 
            to="/plans" 
            className="block w-full bg-primary text-light py-2 rounded hover:bg-secondary transition-colors"
          >
            Recharge Again
          </Link>
          <Link 
            to="/" 
            className="block w-full bg-secondary text-light py-2 rounded hover:bg-primary transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;