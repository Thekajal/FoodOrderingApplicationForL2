import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'

const defaultCredentials = {
    email: 'demo@foodapp.com',
    password: 'demo123'
}

const adminCredentials = {
    email: 'admin@foodapp.com',
    password: 'admin123'
}

const REGISTERED_USER_STORAGE_KEY = 'dummy-food-registered-user'
const SESSION_USER_STORAGE_KEY = 'dummy-food-session-user'

const LoginPopup = ({ setShowLogin, onAuthenticate, authRequired = false }) => {
    const [currState, setCurrState] = useState("Login")
    const [loginMode, setLoginMode] = useState('customer')
    const [formData, setFormData] = useState({
        name: '',
        email: defaultCredentials.email,
        password: defaultCredentials.password,
    })
    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setError('')

        const storedUser = JSON.parse(localStorage.getItem(REGISTERED_USER_STORAGE_KEY) || localStorage.getItem('dummy-food-user') || 'null')

        if (currState === 'Sign Up') {
            const userToStore = {
                name: formData.name.trim() || 'Demo User',
                email: formData.email.trim(),
                password: formData.password,
                role: 'customer',
            }

            localStorage.setItem(REGISTERED_USER_STORAGE_KEY, JSON.stringify(userToStore))
            localStorage.setItem(SESSION_USER_STORAGE_KEY, JSON.stringify(userToStore))
            localStorage.setItem('dummy-food-auth', 'true')
            onAuthenticate(userToStore)
            return
        }

        const validUser = loginMode === 'admin'
            ? { name: 'Admin User', role: 'admin', ...adminCredentials }
            : storedUser || { name: 'Demo User', role: 'customer', ...defaultCredentials }
        const emailMatches = formData.email.trim() === validUser.email
        const passwordMatches = formData.password === validUser.password

        if (!emailMatches || !passwordMatches) {
            setError(`Invalid credentials.`)
            return
        }

        localStorage.setItem('dummy-food-auth', 'true')
        localStorage.setItem(SESSION_USER_STORAGE_KEY, JSON.stringify(validUser))
        onAuthenticate(validUser)
    }

    const handleLoginModeChange = (mode) => {
        setLoginMode(mode)
        setFormData((prev) => ({
            ...prev,
            email: mode === 'admin' ? adminCredentials.email : defaultCredentials.email,
            password: mode === 'admin' ? adminCredentials.password : defaultCredentials.password,
        }))
        setError('')
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    {!authRequired ? <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" /> : null}
                </div>
                {currState === 'Login' ? (
                    <div className='login-popup-mode-switch'>
                        <button type='button' className={loginMode === 'customer' ? 'active' : ''} onClick={() => handleLoginModeChange('customer')}>
                            Customer Login
                        </button>
                        <button type='button' className={loginMode === 'admin' ? 'active' : ''} onClick={() => handleLoginModeChange('admin')}>
                            Admin Login
                        </button>
                    </div>
                ) : null}
                <div className="login-popup-inputs">
                    {currState === 'Login' ? <></> : <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Your Name' required />}
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Your Email' required />
                    <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' required />
                </div>
                {error ? <p className='login-popup-error'>{error}</p> : null}
                <button>{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className="login-popup-conditiion">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the Terms and Conditions of use & Privacy Policy.</p>
                </div>
                {currState === 'Login'
                    ? <p>Create a new account? <span onClick={() => { setCurrState('Sign Up'); handleLoginModeChange('customer') }}>Click Here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup
