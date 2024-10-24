// src/pages/Login.jsx
import React from 'react'
import Logo from '../assets/learn-trail/logo.gif'
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../components/WalletProvider';

const Login = () => {
    const navigate = useNavigate(); 
    const { account, connectWallet } = useWallet();

    const handleClick = async () => {
        if (!account) {
            await connectWallet();
        }
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center space-y-6">
                <img src={Logo} alt="Logo" className="w-48 h-48"/>
                <button 
                onClick={handleClick}
                className="bg-bgBar hover:bg-secondary w-44 h-12 shadow-lg rounded-full text-white font-semibold">
                    {account ? 'Enter App' : 'Connect Smart Wallet'}
                </button>
            </div>
        </div>
    )
}

export default Login