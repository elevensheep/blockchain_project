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
                    <Link to="/" className="logo-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaCar className="icon" /> <span className="logo-text">체인카</span>
                    </Link>
                </div>
                <nav className="nav-links">
                    <Link to="/addcar">내차팔기</Link>
                    <Link to="/">내차사기</Link>
                </nav>
            </div>

            <div className="login-signup">
                {isLoggedIn ? (
                    <div className="login-area">
                        <div className="top-menu">
                            <span className="logout-text" onClick={handleLogout}>로그아웃</span>
                            <Link to="/notice" className="menu-link">공지사항</Link>
                            <Link to="/consumer" className="menu-link">금융소비자보호</Link>
                        </div>
                        <div className="user-icon-alone" onClick={() => navigate('/mypage')}>
                            <FaRegUser className="user-icon" />
                        </div>
                    </div>
                ) : (
                    <>
                        <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
                        {/* <button className="login-btn" onClick={() => setIsLoggedIn(true)}>로그인</button> */}
                        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;