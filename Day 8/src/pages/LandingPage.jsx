import { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const offers = [
    { id: 1, title: '5% Cashback', desc: 'Get 5% cashback on recharges above ₹200', code: 'CASH5' },
    { id: 2, title: '₹50 Off', desc: 'Flat ₹50 off on recharges above ₹500', code: 'FLAT50' },
    { id: 3, title: '10% Cashback', desc: 'Get 10% cashback on first recharge', code: 'FIRST10' }
  ];

  const services = [
    { id: 1, icon: 'Mobile', title: 'Mobile Recharge', desc: 'Quick prepaid & postpaid recharge',
      details: 'Recharge any prepaid or postpaid mobile number instantly. Supports all major operators with multiple payment options.' },
    { id: 2, icon: 'Cashback', title: 'Cashback Rewards', desc: 'Earn up to 5% cashback',
      details: 'Get cashback on every recharge! Earn up to 5% cashback that can be used for future recharges or withdrawn to your bank account.' },
    { id: 3, icon: 'Offers', title: 'Special Offers', desc: 'Exclusive deals & discounts',
      details: 'Access exclusive offers and discounts available only to our users. Limited time deals on popular recharge plans.' }
  ];

  const features = [
    { id: 1, icon: 'Instant', title: 'Instant Recharge', desc: 'Get recharged in seconds',
      details: 'Our lightning-fast processing ensures your mobile is recharged within seconds. No waiting time, instant activation guaranteed.' },
    { id: 2, icon: 'Secure', title: 'Secure Payment', desc: '100% safe transactions',
      details: 'Bank-level encryption and secure payment gateways ensure your transactions are completely safe and protected.' },
    { id: 3, icon: 'Offers', title: 'Best Offers', desc: 'Great deals & cashback',
      details: 'We partner with operators to bring you the best deals and highest cashback rates in the market.' }
  ];

  const operators = [
    { name: 'Airtel', logo: '/images/airtel.svg' },
    { name: 'Jio', logo: '/images/jio.svg' },
    { name: 'Vi', logo: '/images/vi.svg' },
    { name: 'BSNL', logo: '/images/bsnl.svg' }
  ];

  const applyOffer = (offer) => {
    setSelectedOffer(offer);
    setShowOffers(false);
    alert(`Offer "${offer.title}" applied successfully! Use code: ${offer.code}`);
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const openFeatureModal = (feature) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-light py-8 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold text-secondary mb-6">Recharge Made Simple.</h1>
              <p className="text-2xl text-primary mb-8">Fast, secure prepaid recharge in seconds.</p>
              <Link 
                to="/plans" 
                className="bg-primary text-light px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-colors shadow-lg inline-block"
                style={{boxShadow: '0 4px 6px #A0522D'}}
              >
                Start Recharging
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="bg-accent rounded-2xl p-8 shadow-xl">
                <div className="text-8xl text-secondary">📱</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => openServiceModal(service)}
                className="bg-accent rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">{service.title}</h3>
                <p className="text-primary">{service.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => openFeatureModal(feature)}
                className="bg-accent rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">{feature.title}</h3>
                <p className="text-primary">{feature.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">Supported Operators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {operators.map((operator, index) => (
              <div key={index} className="bg-light rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={operator.logo} 
                  alt={operator.name}
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
                <div className="text-lg font-bold text-secondary mb-2">{operator.name}</div>
                <div className="text-sm text-primary">All Plans Available</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cashback Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-light mb-4">Earn Cashback on Every Recharge!</h2>
          <p className="text-lg text-light mb-8">Get up to ₹50 cashback on your recharges</p>
          <div className="bg-light rounded-lg p-6 max-w-md mx-auto">
            <div className="text-2xl font-bold text-secondary mb-2">Instant Cashback</div>
            <div className="text-primary mb-4">Up to 5% on all recharges</div>
            <div className="space-y-2">
              <Link 
                to="/plans" 
                className="block bg-secondary text-light px-6 py-2 rounded font-semibold hover:bg-primary transition-colors"
              >
                Start Earning
              </Link>
              <button 
                onClick={() => setShowOffers(true)}
                className="block w-full bg-primary text-light px-6 py-2 rounded font-semibold hover:bg-accent hover:text-secondary transition-colors"
              >
                Apply Offer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Recharge?</h2>
          <p className="text-lg mb-8">Join thousands of satisfied customers</p>
          <Link 
            to="/plans" 
            className="bg-primary text-light px-8 py-3 rounded-lg font-semibold hover:bg-accent hover:text-secondary transition-colors shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Service Detail Modal */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-light rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{selectedService.icon}</div>
                <h3 className="text-2xl font-bold text-secondary">{selectedService.title}</h3>
              </div>
              <button 
                onClick={() => setShowServiceModal(false)}
                className="text-secondary hover:text-primary text-2xl"
              >
                ×
              </button>
            </div>
            <div className="bg-accent rounded-lg p-4 mb-4">
              <p className="text-primary font-semibold mb-2">Quick Description:</p>
              <p className="text-secondary">{selectedService.desc}</p>
            </div>
            <div className="mb-6">
              <p className="text-primary font-semibold mb-2">Full Details:</p>
              <p className="text-secondary">{selectedService.details}</p>
            </div>
            <button 
              onClick={() => setShowServiceModal(false)}
              className="w-full bg-primary text-light py-3 rounded font-semibold hover:bg-secondary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feature Detail Modal */}
      {showFeatureModal && selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-light rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{selectedFeature.icon}</div>
                <h3 className="text-2xl font-bold text-secondary">{selectedFeature.title}</h3>
              </div>
              <button 
                onClick={() => setShowFeatureModal(false)}
                className="text-secondary hover:text-primary text-2xl"
              >
                ×
              </button>
            </div>
            <div className="bg-accent rounded-lg p-4 mb-4">
              <p className="text-primary font-semibold mb-2">Quick Description:</p>
              <p className="text-secondary">{selectedFeature.desc}</p>
            </div>
            <div className="mb-6">
              <p className="text-primary font-semibold mb-2">Full Details:</p>
              <p className="text-secondary">{selectedFeature.details}</p>
            </div>
            <button 
              onClick={() => setShowFeatureModal(false)}
              className="w-full bg-primary text-light py-3 rounded font-semibold hover:bg-secondary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Offers Modal */}
      {showOffers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-light rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-secondary mb-4">Available Offers</h3>
            <div className="space-y-4">
              {offers.map(offer => (
                <div key={offer.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                  <h4 className="font-semibold text-primary mb-2">{offer.title}</h4>
                  <p className="text-sm text-secondary mb-3">{offer.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-accent text-secondary px-2 py-1 rounded">Code: {offer.code}</span>
                    <button 
                      onClick={() => applyOffer(offer)}
                      className="bg-primary text-light px-4 py-1 rounded text-sm hover:bg-secondary transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowOffers(false)}
              className="mt-4 w-full bg-secondary text-light py-2 rounded hover:bg-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;