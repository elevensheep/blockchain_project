import React from 'react';
import '../style/Login.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 작성
  };

  const handleWalletConnect = () => {
    // 지갑 연결 처리 로직 작성
    alert('지갑 연결 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <div className="form-section">
      <div className="form-wrapper">
        <h1>로그인</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">이메일 주소</label>
          <input type="email" id="email" placeholder="username@gmail.com" required />

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="Password" required />

          <div className="info-text">비밀번호를 잊어버렸나요?</div>

          <label htmlFor="wallet">Connect Wallet Example</label>
          <button type="button" className="wallet-btn" onClick={handleWalletConnect}>
            NFT Wallet Connection
          </button>

          <button type="submit" className="submit-btn">로그인</button>
        </form>
        <div className="footer">
          Don't have an account yet? <a href="signup.html">Register for free</a>
        </div>
      </div>
    </div>
  );
};

export default Login;