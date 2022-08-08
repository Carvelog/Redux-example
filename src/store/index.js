import { legacy_createStore as createStore} from 'redux' //used by learning purpose
import { createSlice, configureStore } from '@reduxjs/toolkit'

// the variable name with the default state or initial state MUST be "initialState"
const initialState = {
  counter: 0,
  showCounter: true
}

// Here we are using the redux toolkit, which "allows" to modify the state, but, internally, another package avoids modifying the original state
const counterSlice = createSlice({
  name: 'counter',
  initialState,
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


// in case we have more than one reducer or slice we can pass to the "reducer" property an object that contains all the recucers
// reducer: { 
//   counter: counterSlice.reducer,
//   anotherThing: anotherThingSlice.reducer
// }
const store = configureStore({
  reducer: counterSlice.reducer
})

// this line saves in the variable an action creator method whose names match the names of our reducers
export const counterActions = counterSlice.actions

// // this example is in case we use the Redux package
// // it is not necessary to do this if we use the redux toolkit
// const defaultCounter = {
//   counter: 0,
//   showCounter: true
// }
// const counterReducer = (state = defaultCounter, action) => {
//   if( action.type === 'INCREMENT' ){
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     }
//   }

//   if( action.type === 'INCREASE' && action.amount){
//     return{
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     }
//   }

//   if( action.type === 'DECREMENT' ){
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     }
//   }

//   if( action.type === 'TOGGLE' ){
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter
//     }
//   }

//   return state
// }

// const store = createStore(counterReducer)

export default store