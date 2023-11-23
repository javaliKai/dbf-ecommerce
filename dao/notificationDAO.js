import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const fetchAllCustomerNotification = async (customerId) => {
  const sql = `SELECT * FROM notification WHERE customer_id=?`;
  const values = [customerId];

  const [row] = await conn.query(sql, values);

  return row;
};

export const fetchAllNotification = async (clerkId) => {
  const sql = `SELECT * FROM notification WHERE clerk_id=?`;
  const values = [clerkId];

  const [row] = await conn.query(sql, values);

  return row;
};

export const insertNewNotification = async (customerId, clerkId, message) => {
  const sql = `
    INSERT INTO notification(customer_id, clerk_id, message, is_read, created_at)
    VALUES (?, ?, ?, 0, NOW())
  `;
  const values = [customerId, clerkId, message];

  const [row] = await conn.query(sql, values);

  // Send the new notification object
  const newNotification = {
    notificationId: row.insertId,
    customerId,
    clerkId,
    message,
    isRead: 0,
  };

  return newNotification;
};
