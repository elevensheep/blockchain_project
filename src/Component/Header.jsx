import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../Style/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            const login_token = sessionStorage.getItem("login_token");
            const oauth_token = sessionStorage.getItem("access_token");
            const isNowLoggedIn = !!login_token || !!oauth_token;
            setIsLoggedIn(isNowLoggedIn);
        };

        // 초기 상태 확인
        checkToken();

        // 브라우저 포커스 시 & 일정 주기로 확인
        window.addEventListener("focus", checkToken);
        const interval = setInterval(checkToken, 1000); // 1초마다 확인

        return () => {
            window.removeEventListener("focus", checkToken);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('login_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        navigate('/');
    };

    return (
        <header className="main-header">
            <div className="left-section">
                <div className="logo">
                    <Link to="/" className="logo-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaCar className="icon" />
                        <span className="logo-text">체인카</span>
                    </Link>
                </div>
                <nav className="nav-links">
                    <Link to="/addcar">내차팔기</Link>
                    <Link to="/list">내차사기</Link>
                </nav>
            </div>

            <div className="login-signup">
                {isLoggedIn ? (
                    <div className="login-area">
                        <button className="login-btn" onClick={handleLogout}>로그아웃</button>
                        <button className="user-btn" onClick={() => navigate('/mypage')}>마이페이지</button>
                    </div>
                ) : (
                    <>
                        <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
                        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
