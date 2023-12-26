import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const fetchAllCustomerCartItems = async (customerId) => {
  const sql = `
    SELECT * FROM cart 
    INNER JOIN cart_item USING (cart_id)
    INNER JOIN product USING (product_id)
    HAVING customer_id=?;
  `;

  const values = [customerId];

  const [row] = await conn.query(sql, values);

  return row === null ? [] : row;
};

export const addCartItem = async (customerId, productId, quantity) => {
  let sql = `SELECT cart_id FROM cart WHERE customer_id=?`;
  let values = [customerId];

  const [row] = await conn.query(sql, values);
  // at this point row contains: [ { cart_id: ??? } ]

  if (row.length == 0) {
    throw new Error('No cart found for customer.');
  }

  const cartId = row[0].cart_id;

  // Reject insertion if there is a same cartId + productId combination in the db
  sql = `
    SELECT * FROM cart_item WHERE cart_id=? AND product_id=?
  `;
  values = [cartId, productId];

  const [checkingRow] = await conn.query(sql, values);

  if (checkingRow.length > 0) {
    const error = new Error(
      'Adding new item failed: item already exist in cart.'
    );
    error.status = 422;
    throw error;
  }

  // Proceed to insertion
  sql = `
    INSERT INTO cart_item(cart_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;
  values = [cartId, productId, quantity];

  const [resultRow] = await conn.query(sql, values);

  // Give back the complete cart item tuple as the result
  const newCartItem = {
    cartItemId: resultRow.insertId,
    cartId,
    productId,
    quantity,
  };

  return newCartItem;
};

export const verifyCustomerCart = async (customerId, cartId) => {
  const sql = `
    SELECT * FROM cart WHERE customer_id=? AND cart_id=?
  `;

  const values = [customerId, cartId];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : row[0];
};

export const deleteAllCartItem = async (cartId) => {
  const sql = `DELETE FROM cart_item WHERE cart_id=?`;
  const values = [cartId];

  const [row] = await conn.query(sql, values);

  return row.affectedRows;
};

export const deleteCartItem = async (cartItemId) => {
  const sql = `
    DELETE FROM cart_item WHERE cartitem_id=?
  `;
  const values = [cartItemId];

  const [row] = await conn.query(sql, values);

  return row.affectedRows;
};

export const verifyCustomerCartItem = async (customerId, cartItemId) => {
  const sql = `
    SELECT * FROM cart_item 
    INNER JOIN cart USING (cart_id)
    HAVING customer_id=? AND cartitem_id=?;
  `;
  const values = [customerId, cartItemId];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : true;
};
