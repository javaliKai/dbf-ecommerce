import Express from 'express';
import { body } from 'express-validator';
import { logClerkIn, logCustomerIn } from '../controller/auth.js';

const router = Express.Router();

/**
 * @Route     /auth/customer-login
 * @Method    POST
 * @Access    Private
 * @Desc      Authenticate customer and get token
 */
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

/**
 * @Route     /auth/clerk-login
 * @Method    POST
 * @Access    Private
 * @Desc      Authenticate clerk and get token
 */
router.post(
  '/clerk-login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  logClerkIn
);

export const authRoutes = router;
