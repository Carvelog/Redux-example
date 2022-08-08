import { legacy_createStore as createStore} from 'redux' //used by learning purpose

// this example is in case we use the Redux package
const defaultCounter = {
  counter: 0,
  showCounter: true
}
const counterReducer = (state = defaultCounter, action) => {
  if( action.type === 'INCREMENT' ){
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    }
  }

  if( action.type === 'INCREASE' && action.amount){
    return{
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }

  if( action.type === 'DECREASE' && action.amount){
    return{
      counter: state.counter - action.amount,
      showCounter: state.showCounter
    }
  }

  if( action.type === 'DECREMENT' ){
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  }

  if( action.type === 'TOGGLE' ){
    return {
      counter: state.counter,
      showCounter: !state.showCounter
    }
  }

  return state
}

const store = createStore(counterReducer)

export default store