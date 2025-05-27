// src/pages/ProfilePage.jsx
import React from "react";

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

    return (
        <div>
            <h2>OAuth 테스트 - 토큰 관리</h2>
            <p><strong>Access Token:</strong> {access_token}</p>
            <p><strong>Refresh Token:</strong> {refresh_token}</p>
            <button onClick={handleRefresh}>🔁 토큰 갱신</button>
            <button onClick={handleDelete}>🚪 토큰 삭제</button>
        </div>
    );
}

export default MyPage;
