import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const handleRecharge = () => {
    navigate('/payment', { state: { plan } });
  };

  return (
    <div className="bg-accent rounded-lg shadow-lg p-6 border hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-semibold text-primary mb-2">{plan.name}</h3>
      <div className="text-2xl font-bold text-secondary mb-2">₹{plan.price}</div>
      <p className="text-secondary mb-4">Validity: {plan.validity}</p>
      <ul className="text-xs text-primary mb-4 space-y-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-secondary mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button 
        onClick={handleRecharge}
        className="w-full bg-primary text-light py-3 rounded hover:bg-secondary transition-colors shadow-md text-sm font-semibold"
      >
        Recharge Now
      </button>
    </div>
  );
};

export default PlanCard;