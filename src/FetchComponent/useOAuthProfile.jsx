import React, { useState } from 'react';

const useOAuthProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const OAuthProfile = async (token) => {
        setLoading(true);
        setError(null);

        try {
            // 1차 요청: OAuth 인증 정보에서 uuid(id) 추출
            const res1 = await fetch("http://localhost:8001/oauth/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res1.ok) throw new Error(`OAuth 프로필 조회 실패: ${res1.status}`);
            const oauthData = await res1.json();

            if (!oauthData?.id) throw new Error("OAuth 응답에 id 없음");

            // 2차 요청: uuid 기반 일반 유저 정보 조회 (인증 없이 POST)
            const res2 = await fetch("http://localhost:8001/api/users/profile-by-id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // POST body 전송 시 필수
                },
                body: JSON.stringify({ id: oauthData.id }),
            });


            if (!res2.ok) throw new Error(`추가 프로필 조회 실패: ${res2.status}`);
            const userData = await res2.json();

            // 병합된 데이터 저장
            setResult({ ...oauthData, ...userData });
        } catch (err) {
            setError(err.message || "알 수 없는 오류");
        } finally {
            setLoading(false);
        }
    };

    return { OAuthProfile, loading, error, result };
};

export default useOAuthProfile;
