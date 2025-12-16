const RechargePlan = require('../models/RechargePlan');

// Create recharge plan
const createRechargePlan = async (req, res) => {
  try {
    const plan = await RechargePlan.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all recharge plans
const getRechargePlans = async (req, res) => {
  try {
    const plans = await RechargePlan.find({ isActive: true });
    res.json({ success: true, plans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get recharge plan by ID
const getRechargePlanById = async (req, res) => {
  try {
    const plan = await RechargePlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Recharge plan not found' });
    }
    res.json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update recharge plan
const updateRechargePlan = async (req, res) => {
  try {
    const plan = await RechargePlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!plan) {
      return res.status(404).json({ message: 'Recharge plan not found' });
    }

    res.json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete recharge plan
const deleteRechargePlan = async (req, res) => {
  try {
    const plan = await RechargePlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Recharge plan not found' });
    }
    res.json({ success: true, message: 'Recharge plan deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createRechargePlan,
  getRechargePlans,
  getRechargePlanById,
  updateRechargePlan,
  deleteRechargePlan
};