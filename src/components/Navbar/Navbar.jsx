import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, currentUser, onLogout, theme, onToggleTheme }) => {

    const [menu, setMenu] = useState("home")
    const isAdmin = currentUser?.role === 'admin'

    const { getTotalCartAmount, orders } = useContext(StoreContext);

    return (
        <div className="navbar">
            <Link to={isAdmin ? '/admin' : '/'}><img className='logo' src='https://www.railrestro.com/img/RailRestro_Logo_v3.png' alt="Logo" /></Link>
            <ul className="navbar-menu">
                {isAdmin ? (
                    <>
                        <Link to="/admin" className={menu === "admin" ? "active" : ""} onClick={() => setMenu("admin")}>Dashboard</Link>
                        <span className='navbar-order-count'>{orders.length} Orders</span>
                    </>
                ) : (
                    <>
                        <Link to="/" className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</Link>
                        <Link to="/my-orders" className={menu === "my-orders" ? "active" : ""} onClick={() => setMenu("my-orders")}>My Orders</Link>
                        <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
                        <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>Mobile App</a>
                        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>Contact Us</a>
                    </>
                )}
            </ul>
            <div className="navbar-right">
                {/* {!isAdmin ? <img src={assets.search_icon} alt="Search" /> : null} */}
                {!isAdmin ? (
                    <div className="navbar-search-icon">
                        <Link to="/cart"><img src={assets.basket_icon} alt="Basket" /></Link>
                        <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                    </div>
                ) : null}
                <button
                    type='button'
                    className='theme-toggle'
                    onClick={onToggleTheme}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                    <span className='theme-toggle-icon' aria-hidden='true'>
                        {theme === 'light' ? '☾' : '☀'}
                    </span>
                </button>
                {currentUser ? <button onClick={onLogout}>{isAdmin ? 'Admin Logout' : 'Logout'}</button> : <button onClick={() => setShowLogin(true)}>Sign In</button>}
            </div>
        </div>
    )
}

export default Navbar
