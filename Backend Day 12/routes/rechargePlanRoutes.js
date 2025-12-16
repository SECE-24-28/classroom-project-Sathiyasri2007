const express = require('express');
const {
  createRechargePlan,
  getRechargePlans,
  getRechargePlanById,
  updateRechargePlan,
  deleteRechargePlan
} = require('../controllers/rechargePlanController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('admin'), createRechargePlan);
router.get('/', getRechargePlans);
router.get('/:id', getRechargePlanById);
router.put('/:id', protect, authorize('admin'), updateRechargePlan);
router.delete('/:id', protect, authorize('admin'), deleteRechargePlan);

module.exports = router;