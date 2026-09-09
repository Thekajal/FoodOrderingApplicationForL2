import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './CustomerOrders.css';

const SESSION_USER_STORAGE_KEY = 'dummy-food-session-user';

function CustomerOrders() {
  const navigate = useNavigate();
  const { getOrdersForCustomer } = useContext(StoreContext);

  const currentUser = JSON.parse(localStorage.getItem(SESSION_USER_STORAGE_KEY) || 'null');
  const customerOrders = getOrdersForCustomer(currentUser?.email);

  return (
    <section className='customer-orders-page'>
      <div className='customer-orders-header'>
        <div>
          <p className='customer-orders-eyebrow'>Customer account</p>
          <h1>My paid orders</h1>
          <p>Review completed payments, reopen order details, and see any delivery status changes made by the admin.</p>
        </div>
      </div>

      {customerOrders.length === 0 ? (
        <div className='customer-orders-empty'>
          <h2>No paid orders yet</h2>
          <p>Complete a payment to have your order appear here.</p>
          <button type='button' onClick={() => navigate('/cart')}>
            Start an order
          </button>
        </div>
      ) : (
        <div className='customer-orders-grid'>
          {customerOrders.map((order) => (
            <article className='customer-order-card' key={order.orderId}>
              <div className='customer-order-top'>
                <div>
                  <p className='customer-order-label'>Order ID</p>
                  <h2>{order.orderId}</h2>
                </div>
                <span className='customer-order-status'>{order.status}</span>
              </div>

              <div className='customer-order-meta'>
                <div>
                  <span>Total paid</span>
                  <strong>${order.totalAmount}</strong>
                </div>
                <div>
                  <span>Placed on</span>
                  <strong>{new Date(order.createdAt).toLocaleString()}</strong>
                </div>
                <div>
                  <span>Phone</span>
                  <strong>{order.customerPhone}</strong>
                </div>
                <div>
                  <span>Delivery address</span>
                  <strong>{order.deliveryAddress}</strong>
                </div>
              </div>

              <div className='customer-order-items'>
                {order.items.map((item) => (
                  <div className='customer-order-item' key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.quantity} x ${item.price}</p>
                    </div>
                    <span>${item.total}</span>
                  </div>
                ))}
              </div>

              <div className='customer-order-actions'>
                <button
                  type='button'
                  onClick={() => navigate('/order-status', { state: { orderId: order.orderId } })}
                >
                  View full status
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CustomerOrders;
