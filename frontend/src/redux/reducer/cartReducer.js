import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    cartItems : [],
    subtotal : 0,
    tax : 0,
    shippingCharges  : 0,
    discount  : 0,
    total : 0,
    shippingInfo : {

    }
};

export const cartReducers = createSlice({
    name : "cartReducer",
    initialState,
    reducers:{
        addToCart : (state,action) => {
state.loading = true;
const index = state.cartItems.findIndex(i => i.productId === action.payload.productId);
if(index !== -1)state.cartItems[index] = action.payload
else state.cartItems.push(action.payload);
state.loading = false;
        },
        removeToCart : (state,action) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            state.loading = false;
        }
        ,
        calculatePrice : (state) => {
            const subTotal = state.cartItems.reduce((total,item)=>{ return total + item.quantity * item.price},0)

            state.subtotal = subTotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal + state.tax + state.shippingCharges - state.discount)
        },
        discountApplied : (state,action) => {
            state.discount = action.payload;
        }
    },
})

export const {addToCart,removeToCart,calculatePrice,discountApplied} = cartReducers.actions;
export default cartReducers.reducer
