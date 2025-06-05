import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Style/Sign.css';
import kiaIcon from "../Image/login_icon.png";
import genesisIcon from "../Image/login_icon2.png";
import bluelinkIcon from "../Image/login_icon3.jpg";

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login_id: loginId,
          password: password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ 로그인 실패: ${data.error || data.detail}`);
      } else {
        alert('✅ 로그인이 완료되었습니다.');

        // JWT 토큰 저장 (선택)
        if (data.token) {
          sessionStorage.setItem('login_token', data.token);
        }

        // 홈으로 이동
        navigate('/');
      }
    } catch (error) {
      alert('🚨 서버 오류로 로그인에 실패했습니다.');
    }
  };
  const access_token = sessionStorage.getItem("login_token");
  console.log("Access Token:", access_token);

  const handleLogin = (brand) => {
    const urls = {
      kia: "http://localhost:5000/oauth/login",
      genesis: "http://localhost:5000/oauth/login",
      bluelink: "http://localhost:5000/oauth/login"
    };
    window.location.href = urls[brand];
  };

  return (
    <div className="sign-page">
      <div className="form-section">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            placeholder="ID"
            onChange={(e) => setLoginId(e.target.value)}
            required
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="info-text">
            <Link to="/reset-password">비밀번호를 잊어버렸나요?</Link>
          </div>

          <div className="easy-login-group">
            <button type="button" className="easy-login-btn kia" onClick={() => handleLogin('kia')}>
              <img src={kiaIcon} alt="기아 로고" className="brand-logo" />
              <span>기아 로그인</span>
            </button>
            <button type="button" className="easy-login-btn genesis" onClick={() => handleLogin('genesis')}>
              <img src={genesisIcon} alt="제네시스 로고" className="brand-logo" />
              <span>제네시스 로그인</span>
            </button>
            <button type="button" className="easy-login-btn bluelink" onClick={() => handleLogin('bluelink')}>
              <img src={bluelinkIcon} alt="블루링크 로고" className="brand-logo" />
              <span>블루링크 로그인</span>
            </button>
          </div>

          <button type="submit">로그인</button>
        </form>

        <div className="register">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
