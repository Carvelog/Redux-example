import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'

// The option that we are going to use to handle the HTTP requests in this example is with the action creators, implemented in the .../store/cart.js file, so we will not need this import anymore.
// NOTE: This approach only works if we are using Redux toolkit
// import { uiActions } from './store/ui';
import { fetchCartData, sendCartData } from './store/cart'

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  // to send an asynchronous http request to the server, we use useEffect to check for changes in the cart state inside the store
  // It is not necessary to make the request in the App.js file, it can also be done in the component itself where the cart state is updated (e.g: cart.js)
  // the option that we are going to use in this example is with the action creators, implemented in the .../store/cart.js file
  // NOTE: This approach only works if we are using Redux toolkit
  // useEffect(()=>{
  //   const sendCartData = async () => {
  //     dispatch(uiActions.showNotification({
  //       status: 'pending',
  //       title: 'Sending...',
  //       message: 'Sending data'
  //     }))
  //     const response = await fetch(
  //       'url-to-firebase or API url',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart)
  //       }
  //     )

  //     if(!response.ok) {
  //       throw new Error('Sending cart data failed.')
  //     }

  //     dispatch(uiActions.showNotification({
  //       status: 'success',
  //       title: 'Success!',
  //       message: 'Sent data successfully!'
  //     }))
  //   }

  //   if(isInitial) {
  //     isInitial = false
  //     return
  //   }

  //   sendCartData.catch(error => {
  //     dispatch(uiActions.showNotification({
  //       status: 'error',
  //       title: 'Error',
  //       message: 'Sending data failed!'
  //     }))
  //   })
    
  // }, [cart])

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if(isInitial) {
      isInitial = false
      return
    }

    if(cart.changed)
      dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && ( 
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
