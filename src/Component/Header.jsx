import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../Style/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <header className="main-header">
            <div className="left-section">
                <div className="logo">
                    <div className="logo">
                        <Link to="/" className="logo-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <FaCar className="icon" />
                            <span className="logo-text">체인카</span>
                        </Link>
                    </div>
                </div>
                <nav className="nav-links">
                    <Link to="/addcar">내차팔기</Link>
                    <Link to="/">내차사기</Link>
                </nav>
            </div>

            <div className="login-signup">
                {isLoggedIn ? (
                    <div className="login-area">
                        <button className="login-btn" onClick={handleLogout}>로그아웃</button>
                        <button className="user-btn" onClick={() => navigate('/mypage')}>
                            <FaRegUser className="user-icon" />
                        </button>
                    </div>
                ) : (
                    <>
                        <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
                        <button className="login-btn" onClick={() => setIsLoggedIn(true)}>로그인테스트</button>
                        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;