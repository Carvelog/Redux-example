import { useSelector, useDispatch } from 'react-redux';

// import the actions from store.js to use directly the methods that we want to dispatch
import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
  // this function inside the hook is managed by Redux and returns the part of the state that we want to use in this component, in this case: counter 
  // when we use the useSelector hook, react-redux will automatically create a subscription to the Redux store for this component
  const counter = useSelector(state => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)
  
  // this hook return a function
  const dispatch = useDispatch()

  const incrementHandler = () => {
    // to dispatch the action that we want to execute we will use the function provided by the hook useDispatch
    dispatch(counterActions.increment())
  }

  const decrementHandler = () => {
    // in this case we call the action directly through the counterActions created in store.js and execute it as a method, because "increment" in a method that when it is executed create a full action object
    dispatch(counterActions.decrement())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)) // {type: uid, payload: 10} redux toolkit create by default this object with the payload that we want to pass to our reducer
  }

  const decreaseHandler = () => {
    dispatch(counterActions.decrease(10)) // {type: uid, payload: 10} redux toolkit create by default this object with the payload that we want to pass to our reducer
  }
  
  
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decreaseHandler}>- 10</button>
        <button onClick={decrementHandler}>-</button>
        <button onClick={incrementHandler}>+</button>
        <button onClick={increaseHandler}>+ 10</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
