import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { insertNewClerk } from '../dao/clerkDAO.js';
import {
  fetchAllOrders,
  fetchOrder,
  fetchOrderDetail,
} from '../dao/orderDAO.js';
import { insertNewShipment } from '../dao/shippingDAO.js';
import {
  fetchAllNotification,
  insertNewNotification,
} from '../dao/notificationDAO.js';

export const getAllClerks = async (req, res, next) => {
  res.send('Todo: connect to database and show the all clerks here...');
};

export const registerNewClerk = async (req, res, next) => {
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
  const { name, email, password } = req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Add new entry to the database
  try {
    const data = await insertNewClerk(name, email, hashedPassword);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    // Perform query on the order table
    const orderData = await fetchAllOrders();
    res.status(200).send(orderData);
  } catch (error) {
    next(error);
  }
};

export const getOrderDetail = async (req, res, next) => {
  // Get url params
  const orderId = req.params.orderId;

  try {
    // Perform query on the order table
    const orderDetail = await fetchOrderDetail(orderId);
    res.status(200).send(orderDetail);
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req, res, next) => {
  // Get orderId from params
  const orderId = req.params.orderId;

  try {
    // Get the selected_address id from the order
    const order = await fetchOrder(orderId);
    const selectedAddress = order.selected_address;

    // Add order to the shipment table
    const newShipment = await insertNewShipment(
      orderId,
      req.clerkId,
      selectedAddress
    );

    res.status(200).send(newShipment);
  } catch (error) {
    next(error);
  }
};

export const sendNotification = async (req, res, next) => {
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

  // Get customerId from request body
  const { customerId, message } = req.body;

  try {
    // Perform query to the notification table
    const newNotification = await insertNewNotification(
      customerId,
      req.clerkId,
      message
    );
    res.status(200).send(newNotification);
  } catch (error) {
    next(error);
  }
};

export const getAllNotifications = async (req, res, next) => {
  try {
    // Perform query to the notification table
    const notificationData = await fetchAllNotification(req.clerkId);
    res.status(200).send(notificationData);
  } catch (error) {
    next(error);
  }
};
