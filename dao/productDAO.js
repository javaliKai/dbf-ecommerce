import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const fetchAllProducts = async () => {
  const [row] = await conn.query(`SELECT * FROM product`);
  return row;
};
