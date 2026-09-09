import React, { useContext } from 'react';
import { ORDER_STATUS_STEPS, StoreContext } from '../../context/StoreContext';
import './Admin.css';

function Admin() {
  const { orders, updateOrderStatus } = useContext(StoreContext);

  return (
    <section className='admin-page'>
      <div className='admin-hero'>
        <div>
          <p className='admin-eyebrow'>Admin console</p>
          <h1>Manage live orders</h1>
          <p>Use the demo admin login to move orders through the delivery pipeline and show status updates in the customer tracking screen.</p>
        </div>
        <div className='admin-summary'>
          <strong>{orders.length}</strong>
          <span>Tracked orders</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className='admin-empty-state'>
          <h2>No orders yet</h2>
          <p>Place a customer order first, then come back here with the admin account to update its status.</p>
          <div className='admin-demo-credentials'>
            <span>Admin email: admin@foodapp.com</span>
            <span>Password: admin123</span>
          </div>
        </div>
      ) : (
        <div className='admin-orders-grid'>
          {orders.map((order) => (
            <article className='admin-order-card' key={order.orderId}>
              <div className='admin-order-header'>
                <div>
                  <p className='admin-order-label'>Order ID</p>
                  <h2>{order.orderId}</h2>
                </div>
                <span className='admin-order-status'>{order.status}</span>
              </div>

              <div className='admin-order-meta'>
                <div>
                  <span>Customer</span>
                  <strong>{order.customerName}</strong>
                </div>
                <div>
                  <span>Contact</span>
                  <strong>{order.customerPhone}</strong>
                </div>
                <div>
                  <span>Address</span>
                  <strong>{order.deliveryAddress}</strong>
                </div>
                <div>
                  <span>Total</span>
                  <strong>${order.totalAmount}</strong>
                </div>
              </div>

              <div className='admin-order-items'>
                {order.items.map((item) => (
                  <div className='admin-order-item' key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.quantity} x ${item.price}</span>
                  </div>
                ))}
              </div>

              <div className='admin-status-controls'>
                <p>Update status</p>
                <div className='admin-status-buttons'>
                  {ORDER_STATUS_STEPS.map((step, index) => (
                    <button
                      type='button'
                      key={step}
                      className={index === order.statusIndex ? 'active' : ''}
                      onClick={() => updateOrderStatus(order.orderId, index)}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Admin;
