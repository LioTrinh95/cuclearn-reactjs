import { createSelector } from '@reduxjs/toolkit'

const cartItemsSelector = state => state.cart.cartItems

//count number of product in cart
export const cartItemCountSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0),
);

//calculate total of cart
export const cartTotalSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((total, item) => total + (item.product.salePrice * item.quantity), 0),
);

