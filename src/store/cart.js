import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui";

const cartDefaultState = {
  items: [],
  totalQty: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartDefaultState,
  reducers: {
    addItem(state, action){
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      state.totalQty++
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
      if(existingItem.quantity === 1){
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        // existingItem.totalPrice -= existingItem.price
      }
    }
  }
})

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
          body: JSON.stringify(cart)
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

export default cartSlice.reducer
export const cartActions = cartSlice.actions