import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../Style/Sign.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

   const userId = location.state?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("잘못된 접근입니다. 다시 시도해주세요.");
      navigate('/verify-user');
      return;
    }

    try {
      const res = await fetch('http://localhost:8001/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          new_password: newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ 비밀번호 재설정 실패: ${data.error || data.detail}`);
      } else {
        alert('✅ 비밀번호가 성공적으로 재설정되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      alert('🚨 서버 오류로 비밀번호 재설정에 실패했습니다.');
    }
  };


    return (
    <div className="sign-page">
      <div className="form-section">
        <h1>비밀번호 재설정</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">비밀번호 재설정</button>
        </form>

        <div className="register">
          비밀번호를 기억하셨나요? <a href="/login">로그인하러 가기</a>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
