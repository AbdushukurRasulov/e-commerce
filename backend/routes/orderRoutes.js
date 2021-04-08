import express from 'express';
const router = express.Router();
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrderById);

export default router;