import { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

export const usePlans = () => useContext(PlanContext);

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('https://6932abe7e5a9e342d2706010.mockapi.io/plan');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  const addPlan = async (plan) => {
    try {
      const response = await fetch('https://6932abe7e5a9e342d2706010.mockapi.io/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan)
      });
      const newPlan = await response.json();
      setPlans([...plans, newPlan]);
    } catch (error) {
      console.error('Failed to add plan:', error);
    }
  };

  const updatePlan = async (id, updatedPlan) => {
    try {
      const response = await fetch(`https://6932abe7e5a9e342d2706010.mockapi.io/plan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlan)
      });
      const updated = await response.json();
      setPlans(plans.map(plan => plan.id === id ? updated : plan));
    } catch (error) {
      console.error('Failed to update plan:', error);
    }
  };

  const deletePlan = async (id) => {
    try {
      await fetch(`https://6932abe7e5a9e342d2706010.mockapi.io/plan/${id}`, {
        method: 'DELETE'
      });
      setPlans(plans.filter(plan => plan.id !== id));
    } catch (error) {
      console.error('Failed to delete plan:', error);
    }
  };

  return (
    <PlanContext.Provider value={{ plans, addPlan, updatePlan, deletePlan }}>
      {children}
    </PlanContext.Provider>
  );
};