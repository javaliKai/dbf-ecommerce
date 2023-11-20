import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const findWishlist = async (productId, customerId) => {
  const sql = `
    SELECT * FROM wishlist WHERE product_id=? AND customer_id=?
  `;

  const values = [productId, customerId];

  const [row] = await conn.query(sql, values);

  // Return the wishlist object directly rather than the row array
  return row[0];
};

export const insertNewWishlist = async (productId, customerId) => {
  const sql = `
    INSERT INTO wishlist(product_id, customer_id, date_issued) VALUES (?, ?, NOW())
  `;

  const values = [productId, customerId];

  const [row] = await conn.query(sql, values);

  const newlyCreatedWishlist = {
    wishlistId: row.insertId,
    productId,
    customerId,
  };

  return newlyCreatedWishlist;
};

export const fetchAllCustomerWishlist = async (customerId) => {
  const sql = `
    SELECT * FROM wishlist 
    INNER JOIN product USING (product_id)
    HAVING customer_id = ?;
  `;

  const values = [customerId];

  const [row] = await conn.query(sql, values);

  return row;
};
