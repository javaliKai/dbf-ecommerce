import {
  findCustomerByEmail,
  getAllCustomers,
  insertNewCustomer,
  updateCustomer,
} from '../dao/customerDAO.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import {
  fetchAllCustomerWishlist,
  findWishlist,
  insertNewWishlist,
} from '../dao/wishlistDAO.js';
import {
  addCartItem,
  deleteAllCartItem,
  deleteCartItem,
  fetchAllCustomerCartItems,
  verifyCustomerCart,
  verifyCustomerCartItem,
} from '../dao/cartDAO.js';
import {
  fetchCustomerOrder,
  fetchOrderDetail,
  insertNewOrder,
} from '../dao/orderDAO.js';
import { fetchAllCustomerShipping } from '../dao/shippingDAO.js';
import { fetchAllCustomerNotification } from '../dao/notificationDAO.js';
import {
  findSelectedCustomerAddressId,
  insertNewAddress,
  selectCustomerAddress,
} from '../dao/customerAddressDAO.js';

export const fetchAllCustomers = async (req, res, next) => {
  try {
    const data = await getAllCustomers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const registerNewCustomer = async (req, res, next) => {
  // Retrieve validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Input validation failed, entered data is incorrect.'
    );
    error.status = 422;
    error.data = errors.array();
    return next(error);
  }

  // Get the form data from incoming request
  const { name, phone, email, password } = req.body;

  // Check whether user is already registered
  const isRegistered = await findCustomerByEmail(email);
  if (isRegistered) {
    const error = new Error('Customer already exists!');
    error.status = 401;
    return next(error);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Add new entry to the database
  try {
    const data = await insertNewCustomer(name, phone, email, hashedPassword);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const addNewAddress = async (req, res, next) => {
  // Get validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Input validation failed, entered data is incorrect.'
    );
    error.status = 422;
    error.data = errors.array();
    return next(error);
  }

  // Get form data from req.body
  const addressFormData = req.body;

  // Insert to database
  try {
    const data = await insertNewAddress(addressFormData);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const selectAddress = async (req, res, next) => {
  // Get validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Input validation failed, entered data is incorrect.'
    );
    error.status = 422;
    error.data = errors.array();
    return next(error);
  }

  // Get form data from request
  const { addressId } = req.body;

  try {
    // Query the address table
    const selectedAddress = await selectCustomerAddress(
      req.customerId,
      addressId
    );
    res.status(200).send(selectedAddress);
  } catch (error) {
    next(error);
  }
};

export const addNewWishlist = async (req, res, next) => {
  // Get product id from URL parameter
  const productId = req.params.productId;

  // Perform db query to wishlist
  try {
    // Reject when a product has been added to the wishlist already
    const wishlistExist = await findWishlist(productId, req.customerId);

    if (wishlistExist) {
      const error = new Error(
        'Product has already been added to the wishlist.'
      );
      error.status = 422;
      return next(error);
    }

    // Add wishlist to db
    const newWishlist = await insertNewWishlist(productId, req.customerId);

    // Send newly created wishlist as the response
    res.status(200).json(newWishlist);
  } catch (error) {
    next(error);
  }
};

export const getAllWishlist = async (req, res, next) => {
  // Query from the database
  try {
    const wishlistData = await fetchAllCustomerWishlist(req.customerId);

    // Note: the API will keep sending the returned query no matter there is a wishlist or not
    // handle the empty wishlist on the frontend gracefully later.
    res.send(wishlistData);
  } catch (error) {
    next(error);
  }
  // Send the result
};

export const getCartItems = async (req, res, next) => {
  // Query from the database
  try {
    const cartData = await fetchAllCustomerCartItems(req.customerId);

    // Send the returned row as the response
    // Note: empty array might be returned
    res.status(200).send(cartData);
  } catch (error) {
    next(error);
  }
};

export const addNewCartItem = async (req, res, next) => {
  // Get the validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Input validation failed, entered data is incorrect.'
    );
    error.status = 422;
    error.data = errors.array();
    return next(error);
  }

  // Get the form data
  const { productId, quantity } = req.body;

  try {
    // Perform db insertion -- handle the cart logic there
    const newCartItem = await addCartItem(req.customerId, productId, quantity);

    res.status(200).send(newCartItem);
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  // Get cartItemId from params
  const { cartItemId } = req.params;

  try {
    // Validate whether the cartItemId belongs to the customer cart
    const isCartItemVerified = await verifyCustomerCartItem(
      req.customerId,
      cartItemId
    );

    if (!isCartItemVerified) {
      const error = new Error('Unauthorized cart item deletion request.');
      error.status = 401;
      return next(error);
    }

    const affectedRows = await deleteCartItem(cartItemId);
    res.status(200).send({ affectedRows });
  } catch (error) {
    next(error);
  }
};

export const getAllCustomerOrders = async (req, res, next) => {
  try {
    // Perform query on the order database
    const orderData = await fetchCustomerOrder(req.customerId);
    res.status(200).send(orderData);
  } catch (error) {
    next(error);
  }
};

export const getCustomerOrderDetail = async (req, res, next) => {
  // Get orderId from params
  const orderId = req.params.orderId;

  try {
    // Perform query on the order table
    const orderDetail = await fetchOrderDetail(orderId);
    res.status(200).send(orderDetail);
  } catch (error) {
    next(error);
  }
};

export const addNewOrder = async (req, res, next) => {
  // Get validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Input validation failed, entered data is incorrect.'
    );
    error.status = 422;
    error.data = errors.array();
    return next(error);
  }

  // Get form data from body
  const { paymentMethod, cartId } = req.body;

  // Custom validation for payment method
  const AVAILABLE_PAYMENT_METHODS = ['bitcoin', 'credit card'];
  const isValid = AVAILABLE_PAYMENT_METHODS.find(
    (method) => method === paymentMethod
  );
  if (!isValid) {
    const error = new Error(
      'Invalid payment method. Choose either bitcoin or credit card.'
    );
    error.status = 422;
    return next(error);
  }

  try {
    // Verify cartId belongs to the corresponding customer
    const cartIsVerified = await verifyCustomerCart(req.customerId, cartId);
    if (!cartIsVerified) {
      const error = new Error('Add order failed, cart is not verified.');
      error.status = 400;
      return next(error);
    }

    // Verify that customer has an address selected
    const selectedAddressId = await findSelectedCustomerAddressId(
      req.customerId
    );
    if (!selectedAddressId) {
      const error = new Error('Add order failed, address is not verified.');
      error.status = 400;
      return next(error);
    }

    // Make sure cart is not empty
    const customerCartItems = await fetchAllCustomerCartItems(req.customerId);
    if (customerCartItems.length == 0) {
      const error = new Error('Cannot issue an order. Cart is empty.');
      error.status = 400;
      return next(error);
    }

    // Perform order query to the database
    const newOrder = await insertNewOrder(
      req.customerId,
      cartId,
      paymentMethod,
      selectedAddressId
    );

    // Perform cart query to the database to delete the cart item data (NOT THE CART ITSELF)
    await deleteAllCartItem(cartId);

    // Send newly created order as the response
    res.status(200).send(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getAllShipping = async (req, res, next) => {
  try {
    // Query the shipping table
    const shippingData = await fetchAllCustomerShipping(req.customerId);

    // Return the shipping data
    res.status(200).send(shippingData);
  } catch (error) {
    next(error);
  }
};

export const getAllNotifications = async (req, res, next) => {
  try {
    // Perform query on notification table
    const notificationData = await fetchAllCustomerNotification(req.customerId);
    res.send(notificationData);
  } catch (error) {
    next(error);
  }
};

export const updateCustomerInfo = async (req, res, next) => {
  // Get validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Input validation failed, entered data is incorrect.'
    );
    error.status = 422;
    error.data = errors.array();
    return next(error);
  }

  // Get form data from body
  const customerFormData = req.body;

  // Validate whether the current logged in user has the same id with the submitted customerId
  if (customerFormData.customerId !== req.customerId) {
    const error = new Error('Update failed, unauthorized access.');
    error.status = 401;
    return next(error);
  }

  try {
    // Perform query to the customer table
    const updatedCustomer = await updateCustomer(customerFormData);

    res.status(200).send(updatedCustomer);
  } catch (error) {
    next(error);
  }
};
