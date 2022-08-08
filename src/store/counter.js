import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = {
  counter: 0,
  showCounter: true
}

// Here we are using the redux toolkit, which "allows" to modify the state, but, internally, another package avoids modifying the original state
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state){
      state.counter++
    },
    decrement(state){
      state.counter--
    },
    increase(state, action){
      state.counter = state.counter + action.payload
    },
    decrease(state, action){
      state.counter = state.counter - action.payload
    },
    toggleCounter(state){
      state.showCounter = !state.showCounter
    }
  }
})

// this line saves in the variable an action creator method whose names match the names of our reducers
export const counterActions = counterSlice.actions

export default counterSlice.reducer