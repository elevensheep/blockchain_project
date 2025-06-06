import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function RedirectPage() {
    const navigate = useNavigate();
    const hasRequested = useRef(false);

    useEffect(() => {
        const fetchAccessTokenAndProfile = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            if (!code || hasRequested.current) return;
            hasRequested.current = true;

            try {
                // 🔹 1. access_token 요청
                const tokenRes = await fetch(`http://localhost:8001/oauth/access?code=${code}`);
                const tokenData = await tokenRes.json();
                if (!tokenData.access_token || !tokenData.refresh_token)
                    throw new Error("유효하지 않은 토큰 응답");

                sessionStorage.setItem("access_token", tokenData.access_token);
                sessionStorage.setItem("refresh_token", tokenData.refresh_token);

                // 🔹 2. 프로필 조회
                const profileRes = await fetch("http://localhost:8001/oauth/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${tokenData.access_token}`
                    }
                });

                if (!profileRes.ok) {
                    const errText = await profileRes.text();
                    throw new Error("프로필 요청 실패: " + errText);
                }

                const userData = await profileRes.json();

                // 🔹 3. DB 사용자 존재 여부 확인
                const checkRes = await fetch("http://localhost:8001/oauth/check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ oauth_id: userData.id })
                });

                const checkResult = await checkRes.json();

                if (checkRes.ok && checkResult.exists) {
                    // 기존 사용자
                    navigate("/mypage");
                } else {
                    // 신규 사용자
                    sessionStorage.setItem("temp_oauth_profile", JSON.stringify(userData)); // 필요시 임시 저장
                    sessionStorage.setItem("oauth_provider", "genesis");
                    navigate("/terms");
                }

            } catch (err) {
                console.error("❌ OAuth 처리 중 오류:", err.message);
                alert("로그인 실패: " + err.message);
            }
        };

        fetchAccessTokenAndProfile();
    }, [navigate]);

    return <div>로그인 처리 중입니다...</div>;
}

export default RedirectPage;
