import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src='https://www.railrestro.com/img/RailRestro_Logo_v3.png' alt="" />
                    <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti delectus reprehenderit laborum distinctio soluta! Libero odit voluptates neque iusto sequi esse! Magni beatae quasi perspiciatis officia. Quidem sint error quos.</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@company.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright © 2024 Food Ordering Application. All rights reserved.
            </p>
        </div>
    )
}

export default Footer
