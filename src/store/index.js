import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'
import counterReducer from './counter'

// in case we have more than one reducer or slice we can pass to the "reducer" property an object that contains all the recucers
// reducer: { 
//   counter: counterSlice.reducer,
//   anotherThing: anotherThingSlice.reducer
// }
// otherwise, you can do:
// reducer: counterSlice.reducer
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  }
})

export default store