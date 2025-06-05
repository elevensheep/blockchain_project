import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Sign.css';

const Signup = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert('약관에 동의해야 회원가입이 가능합니다.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login_id: loginId,
          password: password,
          name: name, // 선택 필드. 필요시 폼에 추가
          phone_number: phone_number
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ 회원가입 실패: ${data.error || data.detail}`);
      } else {
        alert('✅ 회원가입이 완료되었습니다.');
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
      }
    } catch (error) {
      alert('🚨 서버 오류로 회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="sign-page">
      <div className="form-section">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="loginId"
            placeholder="ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />

          <div className="info-text">
            Your Coinbase NFT URL: https://nft.coinbase.com/@YourUserNameHere
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            이 박스를 체크함으로써, 귀하는 Coinbase NFT 서비스 약관 및 개인정보 보호정책을 읽고 이에 동의하며, 만 18세 이상임을 확인합니다
          </label>

          <button type="submit">회원가입</button>
        </form>

        <div className="register">
          이미 회원이신가요? <Link to="/login">로그인하러 가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;