import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Recharge = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("Prepaid");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch recent transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions");
        const data = await res.json();
        if (res.ok) setTransactions(data.transactions || []);
      } catch (err) {
        console.error("Failed to fetch transactions:", err.message);
      }
    };
    fetchTransactions();
  }, []);

  const handleRecharge = async (e) => {
    e.preventDefault();

    // Input validation
    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Enter a valid recharge amount");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, amount: Number(amount), plan }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Recharge failed");

      // Show success message
      setSuccess(`Recharge Successful! ₹${amount} for ${mobile} (${plan})`);
      setMobile("");
      setAmount("");
      setPlan("Prepaid");

      // Add the transaction to the recent list
      setTransactions((prev) => [
        { mobile, amount, plan, date: new Date().toLocaleString() },
        ...prev,
      ]);

      // Auto-hide success after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-light py-10">
      <div className="bg-accent p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Mobile Recharge
        </h2>

        {/* Success Toast */}
        {success && (
          <div className="bg-green-500 text-light px-4 py-2 rounded mb-4 text-center font-medium">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleRecharge} className="space-y-5">
          {/* Mobile Number */}
          <div>
            <label className="block mb-2 text-secondary font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobile}
              onChang
