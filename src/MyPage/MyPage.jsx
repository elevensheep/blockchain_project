import "../Style/MyPage.css";

function MyPage() {
    const access_token = sessionStorage.getItem("access_token");
    const refresh_token = sessionStorage.getItem("refresh_token");

    const handleRefresh = () => {
        fetch(`http://localhost:5000/refresh?refresh_token=${refresh_token}`)
            .then(res => res.json())
            .then(data => {
                console.log("✅ Refresh Success:", data);
                sessionStorage.setItem("access_token", data.access_token);
                alert("Access token 갱신 완료");
            });
    };

    const handleDelete = () => {
        fetch(`http://localhost:5000/delete?access_token=${access_token}`)
            .then(res => res.json())
            .then(data => {
                console.log("🧹 Delete Response:", data);
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("refresh_token");
                alert("로그아웃 완료");
            });
    };

    // Dummy user data
    const userInfo = {
        id: "user_123456",
        email: "user@example.com",
        name: "홍길동",
        mobileNum: "010-1234-5678",
        birthdate: "1990-01-01",
        lang: "ko",
        social: true
    };

    return (
        <div className="profile-page">
            <h2>OAuth 테스트 - 토큰 관리</h2>
            <div className="token-box">
                <p><strong>Access Token:</strong> {access_token}</p>
                <p><strong>Refresh Token:</strong> {refresh_token}</p>
                <div className="token-button-group">
                    <button className="token-refresh-button" onClick={handleRefresh}>🔁 토큰 갱신</button>
                    <button className="token-delete-button" onClick={handleDelete}>🚪 토큰 삭제</button>
                </div>
            </div>

            <h3>👤 사용자 정보</h3>
            <div className="user-info">
                <p><strong>ID:</strong> {userInfo.id}</p>
                <p><strong>이메일:</strong> {userInfo.email}</p>
                <p><strong>이름:</strong> {userInfo.name}</p>
                <p><strong>휴대폰번호:</strong> {userInfo.mobileNum}</p>
                <p><strong>생년월일:</strong> {userInfo.birthdate}</p>
                <p><strong>언어:</strong> {userInfo.lang}</p>
                <p><strong>소셜 로그인:</strong> {userInfo.social ? "예" : "아니오"}</p>
            </div>
        </div>
    );
}

export default MyPage;