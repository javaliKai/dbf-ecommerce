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

export const insertNewShipment = async (orderId, clerkId, selectedAddress) => {
  // Add new shipment data to the 'shipping' table
  const sql = `
    INSERT INTO shipping(order_id, clerk_id, date_issued, shipping_status, shipping_address)
    VALUES (?, ?, NOW(), 'waiting', ?)
  `;
  const values = [orderId, clerkId, selectedAddress];
  const [row] = await conn.query(sql, values);

  // Return the newly created shipping data
  const newShipping = {
    shipping_id: row.insertId,
    order_id: orderId,
    clerk_id: clerkId,
    shipping_status: 'waiting',
    shipping_address: selectedAddress,
  };

  return newShipping;
};
