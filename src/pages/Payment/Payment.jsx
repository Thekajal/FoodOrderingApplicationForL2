import React from 'react';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Payment.css';

const SESSION_USER_STORAGE_KEY = 'dummy-food-session-user';

function Payment() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { cartItems, food_list, getTotalCartAmount, setCartItem, createOrder } = useContext(StoreContext);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem(SESSION_USER_STORAGE_KEY) || 'null');

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const totalAmount = subtotal + deliveryFee;
    const customerDetails = state?.customerDetails ?? {};
    const fullName = [customerDetails.firstName, customerDetails.lastName].filter(Boolean).join(' ');
    const address = [customerDetails.street, customerDetails.city, customerDetails.state, customerDetails.zipCode, customerDetails.country]
        .filter(Boolean)
        .join(', ');
    const orderedItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: cartItems[item._id],
            total: item.price * cartItems[item._id],
        }));

    const handlePayment = () => {
        if (totalAmount === 0) {
            return;
        }

        setShowSuccessPopup(true);
    };

    const handleBackToHome = () => {
        setCartItem({});
        navigate('/');
    };

    const handleViewOrder = () => {
        const orderDetails = createOrder({
            orderId: `ORD-${Date.now().toString().slice(-6)}`,
            status: 'Preparing your food',
            statusIndex: 1,
            subtotal,
            deliveryFee,
            totalAmount,
            items: orderedItems,
            accountEmail: currentUser?.email || customerDetails.email || '',
            customerName: fullName || 'Guest customer',
            customerEmail: customerDetails.email || 'Not provided',
            customerPhone: customerDetails.phone || 'Not provided',
            deliveryAddress: address || 'Not provided',
        });

        setCartItem({});
        navigate('/order-status', {
            state: {
                orderId: orderDetails.orderId,
            },
        });
    };

    return (
        <section className='payment-page'>
            {showSuccessPopup ? (
                <div className='payment-popup-overlay'>
                    <div className='payment-popup'>
                        <div className='payment-popup-icon'>✓</div>
                        <h2>Order placed successfully</h2>
                        <p>Your payment of ${totalAmount} was received. Your food order is now confirmed and will be prepared shortly.</p>
                        <div className='payment-popup-actions'>
                            <button
                                type='button'
                                className='secondary-button'
                                onClick={handleViewOrder}
                            >
                                Track order
                            </button>
                            <button
                                type='button'
                                className='primary-button'
                                onClick={handleBackToHome}
                            >
                                Back to home
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className='payment-card'>
                <div className='payment-header'>
                    {/* <p className='payment-eyebrow'>Demo checkout</p> */}
                    <h1>Payment details</h1>
                    <p>Review the order summary and use this mock payment screen as the next step in your checkout flow.</p>
                </div>

                <div className='payment-content'>
                    <div className='payment-summary'>
                        <h2>Amount summary</h2>
                        <div className='payment-row'>
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className='payment-row'>
                            <span>Delivery fee</span>
                            <span>${deliveryFee}</span>
                        </div>
                        <div className='payment-row payment-total'>
                            <span>Total payable</span>
                            <span>${totalAmount}</span>
                        </div>

                        <div className='payment-methods'>
                            <h3>Accepted methods</h3>
                            <div className='payment-method-list'>
                                <span>Visa</span>
                                <span>Mastercard</span>
                                <span>UPI</span>
                                <span>Net Banking</span>
                            </div>
                        </div>
                    </div>

                    <div className='payment-details'>
                        <h2>Billing information</h2>
                        <div className='detail-block'>
                            <span>Customer</span>
                            <strong>{fullName || 'Guest customer'}</strong>
                        </div>
                        <div className='detail-block'>
                            <span>Email</span>
                            <strong>{customerDetails.email || 'Not provided'}</strong>
                        </div>
                        <div className='detail-block'>
                            <span>Phone</span>
                            <strong>{customerDetails.phone || 'Not provided'}</strong>
                        </div>
                        <div className='detail-block'>
                            <span>Delivery address</span>
                            <strong>{address || 'Not provided'}</strong>
                        </div>

                        <div className='payment-actions'>
                            {/* <button type='button' className='secondary-button' onClick={() => navigate('/cart')}>
                                Edit order
                            </button> */}
                            <button type='button' className='primary-button' onClick={handlePayment}>
                                Pay ${totalAmount}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Payment;