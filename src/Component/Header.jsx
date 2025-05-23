import { FaCar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../Style/Header.css";

const Header = () => {
    return (
        <header className="main-header">
            <div className="left-section">
                <div className="logo">
                    <Link to="/" className="logo-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaCar className="icon" /> 체인카
                    </Link>
                </div>
                <nav className="nav-links">
                    <Link to="/addcar">내차팔기</Link>
                    <Link to="/">내차사기</Link>
                </nav>
            </div>
            <div className="login-signup">
                <button className="login-btn">로그인</button>
                <button className="signup-btn">회원가입</button>
            </div>
        </header>
    );
};

export default Header;