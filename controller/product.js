import axios from 'axios';
import { validationResult } from 'express-validator';
import connectDB from '../util/connectDB.js';
import crypto from 'crypto';
import {
  deleteProduct,
  fetchAllProducts,
  insertNewProduct,
  updateProduct,
} from '../dao/productDAO.js';

const FAKESTORE_API = 'https://fakestoreapi.com/products';

export const getAllProducts = async (req, res, next) => {
  // const apiReq = await axios.get(FAKESTORE_API);
  try {
    const prodData = await fetchAllProducts();
    res.send(prodData);
  } catch (error) {
    next(error);
  }
};

export const populateProduct = async (req, res, next) => {
  // Fetch all data from FakeStore API
  const apiReq = await axios.get(FAKESTORE_API);

  // Iterate over the data
  apiReq.data.forEach((product) => {
    // For each iteration, connect to DB and perform insertion

    const conn = connectDB();
    const sql = `
      INSERT INTO product VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      product.id,
      product.title,
      product.description,
      product.image,
      product.price,
      product.category,
    ];
    conn.query(sql, values, (err, result) => {
      console.log(result);
    });
  });
  res.send('Population success!');
};

export const addNewProduct = async (req, res, next) => {
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

  // Get form data from request body
  const productFormData = req.body;

  try {
    // Generate a unique ID and add to productFormData object
    const id = crypto.randomBytes(16).toString('hex');
    productFormData.productId = id;

    // Perform query to the product table
    const newProduct = await insertNewProduct(productFormData);

    res.status(200).send(newProduct);
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (req, res, next) => {
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

  // Get form data from request body
  const productFormData = req.body;

  try {
    // Perform query to the product table
    const updatedProduct = await updateProduct(productFormData);

    res.status(200).send(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const removeProduct = async (req, res, next) => {
  // Get productId from params
  const { productId } = req.params;

  try {
    // Perform query to the product table
    const affectedRows = await deleteProduct(productId);
    res.status(200).send({ affectedRows });
  } catch (error) {
    next(error);
  }
};
