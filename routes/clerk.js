import Express from 'express';
import { body } from 'express-validator';
import {
  confirmOrder,
  getAllClerks,
  getAllNotifications,
  getAllOrders,
  getOrderDetail,
  registerNewClerk,
  sendNotification,
} from '../controller/clerk.js';
import clerkAuth from '../middlewares/clerkAuth.js';

const router = Express.Router();

/**
 * @Route     /clerk/
 * @Method    GET
 * @Access    Private
 * @Desc      Testing route
 */
router.get('/', getAllClerks);

/**
 * @Route     /clerk/register
 * @Method    POST
 * @Access    Public
 * @Desc      Register a clerk into the database
 */
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').trim().not().isEmpty().withMessage('Name should not be empty'),
  ],
  registerNewClerk
);

/**
 * @Route     /clerk/order
 * @Method    GET
 * @Access    Private
 * @Desc      Get all orders in the database
 */
router.get('/order', clerkAuth, getAllOrders);

/**
 * @Route     /clerk/order/:orderId
 * @Method    GET
 * @Access    Private
 * @Desc      Get an order detail in the database
 */
router.get('/order/:orderId', clerkAuth, getOrderDetail);

/**
 * @Route     /clerk/order/:orderId
 * @Method    PUT
 * @Access    Private
 * @Desc      Confirm an order and proceed order to the shipment process
 */
router.put('/order/:orderId', clerkAuth, confirmOrder);

/**
 * @Route     /clerk/notification
 * @Method    POST
 * @Access    Public
 * @Desc      Send a new notification to the customer
 */
router.post(
  '/notification',
  clerkAuth,
  [
    body('customerId')
      .notEmpty()
      .withMessage('Please provide a valid customerId.'),
    body('message')
      .notEmpty()
      .withMessage('Please provide the notification content.'),
  ],
  sendNotification
);

/**
 * @Route     /clerk/notification
 * @Method    GET
 * @Access    Public
 * @Desc      Get all notifications that sent from the current logged in clerk
 */
router.get('/notification', clerkAuth, getAllNotifications);

/** The whole routes of the clerk module. */
export const clerkRoutes = router;
