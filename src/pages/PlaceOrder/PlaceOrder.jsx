import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const totalAmount = subtotal + deliveryFee;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    navigate('/payment', {
      state: {
        subtotal,
        deliveryFee,
        totalAmount,
        customerDetails: {
          firstName: formData.get('firstName')?.toString().trim() || '',
          lastName: formData.get('lastName')?.toString().trim() || '',
          email: formData.get('email')?.toString().trim() || '',
          street: formData.get('street')?.toString().trim() || '',
          city: formData.get('city')?.toString().trim() || '',
          state: formData.get('state')?.toString().trim() || '',
          zipCode: formData.get('zipCode')?.toString().trim() || '',
          country: formData.get('country')?.toString().trim() || '',
          phone: formData.get('phone')?.toString().trim() || '',
        },
      },
    });
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name='firstName' placeholder='First Name' required />
          <input type="text" name='lastName' placeholder='Last Name' required />
        </div>
        <input type="email" name='email' placeholder='Email Address' required />
        <input type="text" name='street' placeholder='Street' required />
        <div className="multi-fields">
          <input type="text" name='city' placeholder='City' required />
          <input type="text" name='state' placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" name='zipCode' placeholder='Zip Code' required />
          <input type="text" name='country' placeholder='Country' required />
        </div>
        <input type="tel" name='phone' placeholder='Phone Number' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount}</b>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
