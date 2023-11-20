import { validationResult } from 'express-validator';
import { findCustomerByEmail } from '../dao/customerDAO.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const logCustomerIn = async (req, res, next) => {
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

  // Get request form data
  const { email, password } = req.body;

  // Check whether email registered in db
  try {
    const customer = await findCustomerByEmail(email);

    // Throw error when there's no customer found
    if (!customer) {
      const error = new Error('Email is not registered.');
      error.status = 401;
      return next(error);
    }

    // Proceed to password authentication if there's customer found
    const hashedPassword = customer.cust_password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      const error = new Error('Password or email is incorrect');
      error.status = 401;
      return next(error);
    }

    // Generate token...
    const payload = {
      cust_id: customer.cust_id,
      cust_name: customer.cust_name,
      cust_phone: customer.cust_phone,
      cust_email: customer.cust_email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, cust_id: customer.cust_id });
  } catch (error) {
    next(error);
  }
};
