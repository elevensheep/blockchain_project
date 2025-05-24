import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Sign.css';

const Signup = () => {
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert('약관에 동의해야 회원가입이 가능합니다.');
      return;
    }
    alert('회원가입이 완료되었습니다.');
  };

  return (
    <div className="sign-page">
      <div className="form-section">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">이메일 주소</label>
          <input type="email" id="email" placeholder="username@gmail.com" required />

          <div className="info-text">
            Your Coinbase NFT URL: https://nft.coinbase.com/@YourUserNameHere
          </div>

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="Password" required />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <label htmlFor="agree">
              이 박스를 체크함으로써, 귀하는 Coinbase NFT 서비스 약관 및 개인정보 보호정책을 읽고 이에 동의하며, 만 18세 이상임을 확인합니다
            </label>
          </div>

          <button type="submit">회원가입</button>
        </form>

        <div className="register">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;