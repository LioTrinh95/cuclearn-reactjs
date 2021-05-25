const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },
        hideMiniCart(state) {
            state.showMiniCart = false;
        },
        addToCart(state, action) {
            // new Item = { id, product, quantity}
            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id);
            if (index >= 0) {
                //increase quantity
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));

        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            // check if product is available in cart
            const index = state.cartItems.findIndex(x => x.id === id)
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));

        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter(x => x.id !== idNeedToRemove.id);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
    },


});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer;