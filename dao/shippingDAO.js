import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const fetchAllCustomerShipping = async (customerId) => {
  const sql = `
    SELECT * FROM shipping
    INNER JOIN dbf_ecommerce.order ON shipping.order_id = dbf_ecommerce.order.order_id
    WHERE dbf_ecommerce.order.customer_id=?;
  `;
  const values = [customerId];

  const [row] = await conn.query(sql, values);

  return row;
};
