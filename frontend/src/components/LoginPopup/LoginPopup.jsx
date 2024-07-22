import React, { useContext, useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
const LoginPopup = ({ setShowLogin }) => {

    const { url, token, setToken } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState('Login');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += '/api/user/login';
        } else{
            newUrl += '/api/user/register';
        }

        const response = await axios.post(newUrl, data);   
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false); //hide the login page
        } else{
            alert(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === 'sign Up' && <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />

                </div>
                <button type='submit'>{currentState === 'sign Up' ? 'Create account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to terms and conditions</p>
                </div>
                {currentState === 'Login' && <p>Craete a new account? <span onClick={() => setCurrentState('sign Up')}>Click here</span></p>}
                {currentState === 'sign Up' && <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>}
            </form>
        </div>
    )
}
export default LoginPopup
