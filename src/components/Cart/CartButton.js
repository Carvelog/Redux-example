import { uiActions } from '../../store/ui';
import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartTotalQty = useSelector(state => state.cart.totalQty)
  
  const toogleCartHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toogleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartTotalQty}</span>
    </button>
  );
};

export default CartButton;
