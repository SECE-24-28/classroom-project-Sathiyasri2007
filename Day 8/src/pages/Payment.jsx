import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, addRecharge } = useAuth();
  const { plan } = location.state || {};
  const [formData, setFormData] = useState({ mobile: '', operator: '' });
  const [offerCode, setOfferCode] = useState('');
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [finalAmount, setFinalAmount] = useState(plan?.price || 0);

  const offers = [
    { code: 'CASH5', discount: 5, type: 'percentage', minAmount: 200 },
    { code: 'FLAT50', discount: 50, type: 'flat', minAmount: 500 },
    { code: 'FIRST10', discount: 10, type: 'percentage', minAmount: 100 }
  ];

  const applyOffer = () => {
    const offer = offers.find(o => o.code === offerCode.toUpperCase());
    if (!offer) {
      alert('Invalid offer code!');
      return;
    }
    if (plan.price < offer.minAmount) {
      alert(`Minimum amount ₹${offer.minAmount} required for this offer`);
      return;
    }
    
    let discount = 0;
    if (offer.type === 'percentage') {
      discount = (plan.price * offer.discount) / 100;
    } else {
      discount = offer.discount;
    }
    
    const newAmount = Math.max(0, plan.price - discount);
    setFinalAmount(newAmount);
    setAppliedOffer({ ...offer, discount });
    alert(`Offer applied! You saved ₹${discount}`);
  };

  const removeOffer = () => {
    setFinalAmount(plan.price);
    setAppliedOffer(null);
    setOfferCode('');
  };

  if (!plan) {
    navigate('/plans');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecharge({
      operator: formData.operator,
      mobile: formData.mobile,
      amount: finalAmount,
      plan: plan.name,
      originalAmount: plan.price,
      offer: appliedOffer
    });
    const rechargeData = {
      operator: formData.operator,
      mobile: formData.mobile,
      amount: finalAmount,
      plan: plan.name,
      originalAmount: plan.price,
      offer: appliedOffer,
      cashback: Math.round(finalAmount * 0.02)
    };
    
    addRecharge(rechargeData);
    navigate('/success', { state: { rechargeData } });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container mx-auto px-4 max-w-2xl py-12">
        <h1 className="text-3xl font-bold text-center text-secondary mb-8">Payment</h1>
        
        <div className="bg-accent rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-secondary mb-2">{plan.name}</h3>
          <div className="text-2xl font-bold text-secondary mb-2">
            {appliedOffer ? (
              <div>
                <span className="line-through text-gray-500">₹{plan.price}</span>
                <span className="ml-2">₹{finalAmount}</span>
                <div className="text-sm text-green-600">Saved ₹{appliedOffer.discount}</div>
              </div>
            ) : (
              `₹${plan.price}`
            )}
          </div>
          <p className="text-secondary opacity-70">Validity: {plan.validity}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-accent rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Mobile Number
            </label>
            <input
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary text-lg"
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Operator
            </label>
            <select
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary text-lg"
              required
            >
              <option value="">Select Operator</option>
              <option value="airtel">Airtel</option>
              <option value="jio">Jio</option>
              <option value="vi">Vi</option>
              <option value="bsnl">BSNL</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-secondary mb-2">
              Offer Code (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={offerCode}
                onChange={(e) => setOfferCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary text-lg"
                placeholder="Enter offer code"
              />
              <button
                type="button"
                onClick={applyOffer}
                className="bg-primary text-light px-6 py-3 rounded-md hover:bg-secondary transition-colors"
              >
                Apply
              </button>
            </div>
            {appliedOffer && (
              <div className="mt-2 flex items-center justify-between bg-green-100 p-2 rounded">
                <span className="text-green-800 text-sm">Offer {appliedOffer.code} applied</span>
                <button
                  type="button"
                  onClick={removeOffer}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-light py-4 rounded-md hover:bg-secondary transition-colors font-semibold text-lg"
          >
            Pay ₹{finalAmount}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;