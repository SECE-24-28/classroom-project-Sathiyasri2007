import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [totalCashback, setTotalCashback] = useState(0);

  const login = async (credentials) => {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password required');
    }
    
    const userData = {
      id: Date.now(),
      email: credentials.email,
      name: 'User'
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    return userData;
  };

  const signup = async (userData) => {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields required');
    }
    
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name
    };
    
    setUser(newUser);
    setIsLoggedIn(true);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setRechargeHistory([]);
    setTotalCashback(0);
  };

  const addRecharge = async (rechargeData) => {
    const newRecharge = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      operator: rechargeData.operator,
      mobile: rechargeData.mobile,
      amount: rechargeData.amount,
      plan: rechargeData.plan,
      status: 'Success',
      cashback: rechargeData.cashback || 0
    };
    
    setRechargeHistory(prev => [newRecharge, ...prev]);
    setTotalCashback(prev => prev + (rechargeData.cashback || 0));
    
    return newRecharge;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        rechargeHistory,
        totalCashback,
        login,
        signup,
        logout,
        addRecharge
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};