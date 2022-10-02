import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui";

const cartDefaultState = {
  items: [],
  totalQty: 0,
  changed: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartDefaultState,
  reducers: {
    addItem(state, action){
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      state.totalQty++
      state.changed = true
      if( !existingItem ) {
        // here it is no problem mutating the state because react toolkit internally make the state no mutable
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
    },
    removeItem(state, action){
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      state.totalQty--
      state.changed = true
      if(existingItem.quantity === 1){
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    }
  }
})

// THIS is a THUNK - una funcion action creator que retorna otra de manera asincrona 
// sendCartData en el thunk y retorna las actions, en este caso los dispatch(showNotification) 
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending data'
    }))

    const sendRequest = async () => {
      const response = await fetch(
        'url-to-firebase or API url',
        {
          method: 'PUT',
          body: JSON.stringify({
              items: cart.items,
              totalQuantity: cart.totalQuantity,
          })
        }
      )
  
      if(!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent data successfully!'
      }))
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending data failed!'
      }))
    }
  }
}

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'url-to-firebase or API url'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export default cartSlice.reducer
export const cartActions = cartSlice.actions