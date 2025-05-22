import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { FaCar } from 'react-icons/fa';
import "../App.css";


const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="main-header">
            <div className="left-section">
                <div className="logo">
                    <FaCar className="icon" /> 체인카
                </div>
                <nav className="nav-links">
                    <a href="/">내차팔기</a>
                    <a href="/">내차사기</a>
                </nav>
            </div>
            <div className="login-signup">
                <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
                <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
            </div>
        </header>
    );
};

export default Header;