import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Sign.css';

const VerifyUser = () => {
  const [loginId, setLoginId] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/verify-reset-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login_id: loginId, name, phone_number: phoneNumber })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '사용자 확인 실패');
        return;
      }

      // ✅ 사용자 확인 성공 → userId를 포함해 reset-password 페이지로 이동
      navigate('/reset-password', { state: { userId: data.userId } });
    } catch (err) {
      setError('🚨 서버 오류로 사용자 확인에 실패했습니다.');
    }
  };

  return (
    <div className="sign-page">
      <div className="form-section">
        <h1>비밀번호 재설정 - 사용자 확인</h1>
        <form onSubmit={handleVerify} className="signup-form">
          <input
            type="text"
            placeholder="ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit">사용자 확인</button>
        </form>
        {error && <p className="error-message">{error}</p>}

        <div className="register">
          비밀번호를 기억하셨나요? <a href="/login">로그인하러 가기</a>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
