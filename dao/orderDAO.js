import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const insertNewOrder = async (customerId, cartId, paymentMethod) => {
  // Perform insertion to order table
  let sql = `
    INSERT INTO dbf_ecommerce.order(customer_id, date_issued, order_status, payment_method, date_finished)
    VALUES (?, NOW(), 'waiting', ?, NULL)
  `;
  let values = [customerId, paymentMethod];
  const [orderRow] = await conn.query(sql, values);
  const orderId = orderRow.insertId;

  // Perform insertion to order_item table
  // 1. use cartId to get all cart items
  sql = `
    SELECT * FROM cart_item 
    INNER JOIN cart USING (cart_id)
    HAVING cart_id=?
  `;
  values = [cartId];
  const [cartItems] = await conn.query(sql, values);

  // 2. iterate over the cartItems, construct a collection of sql insertion query
  let orderItemQueue = [
    'INSERT INTO order_item(order_id, product_id, quantity) VALUES ',
  ];
  cartItems.forEach((item) => {
    const queryModel = `(${orderId}, ${item.product_id}, ${item.quantity}),`;

    orderItemQueue.push(queryModel);
  });

  // 3. Combine the orderItemQueue into a single string
  // 3.a. Change the last comma into semicolon (;)
  const orderItemQueueTemp = orderItemQueue.join('').split('');
  orderItemQueueTemp.pop();
  orderItemQueueTemp.push(';');
  const orderItemSql = orderItemQueueTemp.join('');

  // 4. Execute the query
  const [row] = await conn.query(orderItemSql);

  // 5. Return the new order object
  const newOrderObj = {
    order_id: orderId,
    customerId: customerId,
    order_status: 'waiting',
    paymentMethod: paymentMethod,
  };

  return newOrderObj;
};

export const verifyCustomerOrder = async (customerId, orderId) => {
  const sql = `SELECT * FROM order WHERE customer_id=? AND order_id=?`;
  const values = [customerId, orderId];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : row[0];
};
