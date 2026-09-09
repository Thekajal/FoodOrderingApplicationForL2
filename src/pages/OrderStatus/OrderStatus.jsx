import React from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ORDER_STATUS_STEPS, StoreContext } from '../../context/StoreContext';
import './OrderStatus.css';

const SESSION_USER_STORAGE_KEY = 'dummy-food-session-user'

function OrderStatus() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getOrderById, getLatestOrderForCustomer, latestOrderId } = useContext(StoreContext);

  const currentUser = JSON.parse(localStorage.getItem(SESSION_USER_STORAGE_KEY) || 'null');
  const customerOrder = getLatestOrderForCustomer(currentUser?.email);

  const orderId = state?.orderId || state?.order?.orderId || latestOrderId;
  const order = orderId ? getOrderById(orderId) : customerOrder;

  if (!order) {
    return (
      <section className='order-status-page'>
        <div className='order-status-card'>
          <h1>No active order found</h1>
          <p>Place an order first to view its payment summary and delivery status.</p>
          <button type='button' className='order-status-button primary' onClick={() => navigate('/cart')}>
            Go to cart
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className='order-status-page'>
      <div className='order-status-card'>
        <div className='order-status-header'>
          <div>
            <p className='order-status-eyebrow'>Live order tracking</p>
            <h1>Your order is on the way</h1>
            <p>Payment was successful. Track the current progress and review the confirmed order details below.</p>
          </div>
          <div className='order-status-badge'>{order.status}</div>
        </div>

        <div className='order-status-layout'>
          <div className='order-status-section'>
            <h2>Status timeline</h2>
            <div className='order-status-steps'>
              {ORDER_STATUS_STEPS.map((step, index) => (
                <div className={`status-step ${index <= order.statusIndex ? 'active' : ''}`} key={step}>
                  <div className='status-step-marker'>{index + 1}</div>
                  <div>
                    <strong>{step}</strong>
                    <p>{index < order.statusIndex ? 'Completed' : index === order.statusIndex ? 'Current status' : 'Waiting'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='order-status-section'>
            <h2>Order summary</h2>
            <div className='order-meta-grid'>
              <div>
                <span>Order ID</span>
                <strong>{order.orderId}</strong>
              </div>
              <div>
                <span>Payment</span>
                <strong>Successful</strong>
              </div>
              <div>
                <span>Customer</span>
                <strong>{order.customerName}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{order.customerEmail || 'Not provided'}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{order.customerPhone}</strong>
              </div>
            </div>

            <div className='order-delivery-box'>
              <span>Delivery address</span>
              <strong>{order.deliveryAddress}</strong>
            </div>

            <div className='order-items-list'>
              {order.items.map((item) => (
                <div className='order-item-row' key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.quantity} x ${item.price}</p>
                  </div>
                  <span>${item.total}</span>
                </div>
              ))}
            </div>

            <div className='order-total-box'>
              <div>
                <span>Subtotal</span>
                <strong>${order.subtotal}</strong>
              </div>
              <div>
                <span>Delivery fee</span>
                <strong>${order.deliveryFee}</strong>
              </div>
              <div className='grand-total'>
                <span>Total paid</span>
                <strong>${order.totalAmount}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className='order-status-actions'>
          <button type='button' className='order-status-button secondary' onClick={() => navigate('/')}>
            Back to home
          </button>
          <button type='button' className='order-status-button primary' onClick={() => navigate('/')}>
            Start new order
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderStatus;