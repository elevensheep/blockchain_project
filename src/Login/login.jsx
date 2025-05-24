import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Sign.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  const handleWalletConnect = () => {
    alert('지갑 연결 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <div className="sign-page">
      <div className="form-section">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">이메일 주소</label>
          <input type="email" id="email" placeholder="username@gmail.com" required />

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="Password" required />

          <div className="info-text">비밀번호를 잊어버렸나요?</div>

          <label htmlFor="wallet">Connect Wallet Example</label>
          <button type="button" className="wallet-btn" onClick={handleWalletConnect}>
            NFT Wallet Connection
          </button>

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