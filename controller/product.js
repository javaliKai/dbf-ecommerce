import axios from 'axios';
import connectDB from '../util/connectDB.js';
import { fetchAllProducts } from '../dao/productDAO.js';

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
