import Express from 'express';
import { body } from 'express-validator';
import { logCustomerIn } from '../controller/auth.js';

const router = Express.Router();

router.post(
  '/customer-login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  logCustomerIn
);

export const authRoutes = router;
