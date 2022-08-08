import { useSelector, useDispatch } from 'react-redux';

// import the actions from store.js to use directly the methods that we want to dispatch
import { counterActions } from '../store/index';
import classes from './Counter.module.css';

const Counter = () => {
  // this function inside the hook is managed by Redux and returns the part of the state that we want to use in this component, in this case: counter 
  // when we use the useSelector hook, react-redux will automatically create a subscription to the Redux store for this component
  const counter = useSelector(state => state.counter)
  const show = useSelector(state => state.showCounter)
  
  // this hook return a function
  const dispatch = useDispatch()

  const incrementHandler = () => {
    // to dispatch the action that we want to execute we will use the function provided by the hook useDispatch
    // dispatch({type: 'INCREMENT'})

    // this example we are using redux toolkit
    dispatch(counterActions.increment())
  }

  const decrementHandler = () => {
    // dispatch({type: 'DECREMENT'})

    // this example we are using redux toolkit
    // in this case we call the action directly through the counterActions created in store.js and execute it as a method, because "increment" in a method that when it is executed create a full action object
    dispatch(counterActions.decrement())
  }

  const increaseHandler = () => {
    // dispatch({type: 'INCREASE', amount: 10})

    // this example we are using redux toolkit
    dispatch(counterActions.increase(10)) // {type: uid, payload: 10} redux toolkit create by default this object with the payload that we want to pass to our reducer
  }

  const decreaseHandler = () => {
    // this example we are using redux toolkit
    dispatch(counterActions.decrease(10)) // {type: uid, payload: 10} redux toolkit create by default this object with the payload that we want to pass to our reducer
  }
  
  
  const toggleCounterHandler = () => {
    // dispatch({type: 'TOGGLE'})

    // this example we are using redux toolkit
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


// // Redux in class based components

// import { Component } from 'react'; // only used if the component is classe based
// import { connect } from 'react-redux'; // only used if the component is classe based

// class Counter extends Component {
//   incrementHandler = () => {
//     this.props.increment()
//   }

//   decrementHandler = () => {
//     this.props.decrement()
//   }
  
//   toggleCounterHandler = () => {};

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.decrementHandler.bind(this)}>-</button>
//           <button onClick={this.incrementHandler.bind(this)}>+</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({type: 'INCREMENT'}),
//     decrement: () => dispatch({type: 'DECREMENT'})
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
