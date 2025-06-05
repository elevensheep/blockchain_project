import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Sign.css';

const PasswordReset = () => {
  const [loginId, setLoginId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ 요청 실패: ${data.error || data.detail}`);
      } else {
        alert('✅ 비밀번호 재설정 이메일이 전송되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      alert('🚨 서버 오류로 요청을 처리할 수 없습니다.');
    }
  };

  return (
    <div className="sign-page">
      <div className="form-section">
        <h1>비밀번호 찾기</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="id">가입된 아이디</label>
          <input
            type="text"
            id="id"
            placeholder="ID"
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
          <button type="submit">이메일 전송</button>
        </form>

        <div className="register">
          계정을 기억하셨나요? <Link to="/login">로그인하러 가기</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;