import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/product/productReducer';
import { cartReducer } from './reducers/cart/cartReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/user/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/order/orderReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderListMyReducer,
  listUsers: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: {
    userInfo: userInfoFormStorage
  }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;