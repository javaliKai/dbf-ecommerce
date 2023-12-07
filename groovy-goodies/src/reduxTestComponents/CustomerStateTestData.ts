const custReqData = {
  addToCart: {
    productId: 3,
    quantity: 1,
  },
  newAddress: {
    customerId: 1017,
    country: 'Malaysia',
    province: 'Kuala Lumpur',
    state: 'Johor',
    addressDetail: 'Banyak kali detail',
  },
  newWishlist: {
    productId: '7',
  },
  newOrder: {
    paymentMethod: 'bitcoin',
    cartId: 4002,
  },
  selectAddress: {
    addressId: 2006,
  },
  updateCustomer: {
    customerId: 1017,
    name: 'Mario Bros',
    phone: '8612345',
    email: 'mario@gmail.com',
  },
  deleteCartItem: {
    cartItemId: 5018,
  },
};

export default custReqData;
