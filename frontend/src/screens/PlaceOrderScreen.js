import React, { useEffect } from 'react';
import {Button, Col, Row, ListGroup, Image, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/order/orderActions'
import { Link } from 'react-router-dom';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod, cartItems } = useSelector(state => state.cart);

  let itemsPrice, shippingPrice, taxPrice, totalPrice;

  const addDecimals = num => {
    return (Math.round(num * 100)/ 100).toFixed(2)
  }

  itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

  const { order, success, error } = useSelector(state => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/order/${ order._id }`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    }))
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city} {' '} {shippingAddress.postalCode}  {' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${ item.product }`}>{item.name}</Link>
                        </Col>
                        <Col>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tex</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen
