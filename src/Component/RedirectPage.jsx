// src/pages/RedirectPage.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function RedirectPage() {
    const navigate = useNavigate();
    const hasRequested = useRef(false); // 요청 중복 방지용 ref

    useEffect(() => {
        const fetchAccessToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            if (!code) {
                console.warn("Authorization code가 없습니다.");
                return;
            }

            // 이미 요청한 경우 중단
            if (hasRequested.current) return;
            hasRequested.current = true;

            try {
                const res = await fetch(`http://localhost:5000/oauth/access?code=${code}`);

                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(`토큰 요청 실패: ${errText}`);
                }

                const data = await res.json();

                if (!data.access_token || !data.refresh_token) {
                    throw new Error("유효하지 않은 토큰 응답");
                }

                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("refresh_token", data.refresh_token);
                navigate("/mypage");
            } catch (err) {
                console.error("토큰 요청 중 오류 발생:", err);
                alert("로그인 중 문제가 발생했습니다.");
            }
        };

        fetchAccessToken();
    }, [navigate]);

    return <div>로그인 처리 중입니다...</div>;
}

export default RedirectPage;
