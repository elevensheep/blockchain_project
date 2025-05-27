// src/pages/RedirectPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            fetch(`http://localhost:5000/access?code=${code}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Access Token:", data);
                    sessionStorage.setItem("access_token", data.access_token);
                    sessionStorage.setItem("refresh_token", data.refresh_token);
                    navigate("/mypage");
                })
                .catch(err => {
                    console.error("토큰 요청 실패:", err);
                });
        }
    }, [navigate]);

    return <div>로그인 처리 중입니다...</div>;
}

export default RedirectPage;
