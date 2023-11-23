import Express from 'express';
import { body } from 'express-validator';
import {
  fetchAllCustomers,
  registerNewCustomer,
  addNewAddress,
  addNewWishlist,
  getAllWishlist,
  getCartItems,
  addNewCartItem,
  addNewOrder,
  getAllShipping,
  getAllNotifications,
  selectAddress,
  getAllCustomerOrders,
  getCustomerOrderDetail,
} from '../controller/customer.js';
import auth from '../middlewares/auth.js';

const router = Express.Router();

/**
 * @Route     /customer/
 * @Method    GET
 * @Access    -
 * @Desc      Retrieve all customer in the database (testing
 */
router.get('/', auth, fetchAllCustomers);

/**
 * @Route     /customer/register
 * @Method    POST
 * @Access    Public
 * @Desc      Register a customer into the database
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
    body('phone')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Phone should not be empty'),
  ],
  registerNewCustomer
);

/**
 * @Route     /customer/add-address
 * @Method    POST
 * @Access    Private
 * @Desc      Add a new address for customer
 */
router.post(
  '/add-address',
  auth,
  [
    body('customerId').notEmpty().withMessage('Please provide the customer ID'),
    body('country').notEmpty().withMessage('Please provide the country'),
    body('province').notEmpty().withMessage('Please provide the province'),
    body('state').notEmpty().withMessage('Please enter the state'),
    body('addressDetail')
      .notEmpty()
      .withMessage('Please provide the address detail'),
  ],
  addNewAddress
);

/**
 * @Route     /customer/select-address
 * @Method    PUT
 * @Access    Private
 * @Desc      Select an address that will be used for shipment
 */
router.put(
  '/select-address',
  auth,
  [
    body('addressId')
      .notEmpty()
      .withMessage('Please provide a valid addressId.'),
  ],
  selectAddress
);

/**
 * @Route     /customer/add-wishlist/:productId
 * @Method    POST
 * @Access    Private
 * @Desc      Add a product to the customer wishlist
 */
router.post('/add-wishlist/:productId', auth, addNewWishlist);

/**
 * @Route     /customer/wishlist
 * @Method    GET
 * @Access    Private
 * @Desc      Get the customer's wishlist information
 */
router.get('/wishlist', auth, getAllWishlist);

/**
 * @Route     /customer/cart
 * @Method    GET
 * @Access    Private
 * @Desc      Get the customer's cart information
 */
router.get('/cart', auth, getCartItems);

/**
 * @Route     /customer/cart/add-item
 * @Method    POST
 * @Access    Private
 * @Desc      Add new item to the cart
 */
router.post(
  '/cart/add-item',
  auth,
  [
    body('productId')
      .trim()
      .notEmpty()
      .withMessage('Please provide a product ID.'),
    body('quantity')
      .isNumeric()
      .withMessage('Please provide a valid quantity value.'),
  ],
  addNewCartItem
);

/**
 * @Route     /customer/order
 * @Method    GET
 * @Access    Private
 * @Desc      Get all the customer's order
 */
router.get('/order', auth, getAllCustomerOrders);

/**
 * @Route     /customer/order/:orderId
 * @Method    GET
 * @Access    Private
 * @Desc      Get the customer's order detail
 */
router.get('/order/:orderId', auth, getCustomerOrderDetail);

/**
 * @Route     /customer/order
 * @Method    POST
 * @Access    Private
 * @Desc      Create a new order from the cart data
 */
router.post(
  '/order',
  auth,
  [
    body('paymentMethod')
      .trim()
      .notEmpty()
      .withMessage('Please provide a payment method.'),
    body('cartId')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid cartId.'),
  ],
  addNewOrder
);

/**
 * @Route     /customer/shipping/
 * @Method    GET
 * @Access    Private
 * @Desc      View all customer's shipping status
 */
router.get('/shipping', auth, getAllShipping);

/**
 * @Route     /customer/notification
 * @Method    GET
 * @Access    Private
 * @Desc      View all customer's notification
 */
router.get('/notification', auth, getAllNotifications);

/** The whole routes of the user module. */
export const customerRoutes = router;
