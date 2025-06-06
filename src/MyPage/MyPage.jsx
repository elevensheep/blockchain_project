import "../Style/MyPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectWallet from "../Component/ConnectWallet";

function MyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [carList, setCarList] = useState(null);
  const [nftStatusMap, setNftStatusMap] = useState({});
  const [error, setError] = useState("");
  const [carError, setCarError] = useState("");

  const jwtToken = sessionStorage.getItem("login_token");
  const oauthToken = sessionStorage.getItem("access_token");
  const refresh_token = sessionStorage.getItem("refresh_token");
  const isOAuth = !!oauthToken;

  const fetchMyCarList = async () => {
    const token = jwtToken || oauthToken;
    if (!token) return;

    try {
      const res = await fetch(isOAuth
        ? "http://localhost:8001/oauth/mycarlist"
        : "http://localhost:8001/api/car/mycars", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`차량 목록 오류 응답: ${res.status}`);

      const json = await res.json();
      setCarList(json);

      const statusMap = {};
      for (const car of json.cars || []) {
        try {
          const res = await fetch(`http://localhost:8001/api/nft/status/${car.carId}`);
          if (res.ok) {
            const data = await res.json();
            statusMap[car.carId] = data;
          } else {
            statusMap[car.carId] = null;
          }
        } catch (e) {
          statusMap[car.carId] = null;
        }
      }
      setNftStatusMap(statusMap);

    } catch (err) {
      console.error("차량 목록 요청 오류:", err);
      setCarError(err.message);
    }
  };

  const handleMintNFT = async (car) => {
    if (!profile?.wallet?.wallet_address) {
      alert("지갑이 연결되어 있지 않습니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8001/api/nft/mintNFT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId: car.carId,
          owner: profile.wallet.wallet_address,
          metadata: JSON.stringify({
            carSellname: car.carSellname,
            carName: car.carName,
            carType: car.carType,
            carNickname: car.carNickname,
          }),
          price: 0,
        }),
      });

      const data = await res.json();
      alert(data.success ? "✅ NFT 발행 성공" : "❌ NFT 발행 실패: " + data.message);
      fetchMyCarList();
    } catch (err) {
      console.error("NFT 발행 오류:", err);
      alert("서버 오류로 NFT 발행 실패");
    }
  };

  const handleDeleteCar = async (carId) => {
    const token = jwtToken;
    if (!token) return;

    const confirmDelete = window.confirm("정말로 이 차량을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8001/api/car/delete/${carId}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("차량 삭제 실패");

      fetchMyCarList();
    } catch (err) {
      console.error("차량 삭제 오류:", err);
      alert("차량 삭제 실패");
    }
  };

  const handleWalletConnected = (address) => {
    setProfile((prev) => ({
      ...prev,
      wallet: { ...(prev?.wallet || {}), wallet_address: address },
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = jwtToken || oauthToken;
      if (!token) return setError("로그인이 필요합니다.");

      try {
        const res = await fetch(isOAuth
          ? "http://localhost:8001/oauth/profile"
          : "http://localhost:8001/api/users/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "서버 오류");
        setProfile(data);
      } catch (err) {
        console.error("Profile Error:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [jwtToken, oauthToken]);

  useEffect(() => {
    fetchMyCarList();
  }, [jwtToken, oauthToken]);

  return (
    <div className="profile-page">
      <div className="page-container">
        <h1 className="page-title">마이페이지</h1>

        <div className="section">
          <h3 className="section-title">사용자 정보</h3>
          <div className="info-card">
            {error ? (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : profile ? (
              <>
                {profile.login_id && <p><strong>아이디:</strong> {profile.login_id}</p>}
                <p><strong>이름:</strong> {profile.name}</p>
                <p><strong>휴대폰번호:</strong> {isOAuth ? profile.mobileNum : profile.phone_number}</p>
                {profile.wallet?.wallet_address && (
                  <p><strong>지갑 주소:</strong> {profile.wallet.wallet_address}</p>
                )}
              </>
            ) : (
              <p className="car-promo-text">로딩 중...</p>
            )}
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">내 차 정보</h3>
          <div className="info-card">
            {carError ? (
              <p style={{ color: "red", textAlign: "center" }}>{carError}</p>
            ) : carList?.cars?.length > 0 ? (
              <div className="car-list-grid">
                {carList.cars.map((car) => {
                  const nft = nftStatusMap[car.carId];
                  const isMyNFT = nft?.owner === profile?.wallet?.wallet_address;

                  return (
                    <div className="car-card" key={car.carId || car._id}>
                      <div className="car-name">{car.carSellname} ({car.carName})</div>
                      <div className="car-price">차량 타입: {car.carType}</div>
                      <div className="car-desc">닉네임: {car.carNickname}</div>
                      {isOAuth ? (
                        nft ? (
                          <div style={{ color: isMyNFT ? 'green' : 'gray' }}>
                            ✅ NFT 등록됨 {isMyNFT ? "(내 소유)" : "(타인 소유)"}
                          </div>
                        ) : (
                          <button
                            className="mint-button"
                            onClick={() => handleMintNFT(car)}
                            disabled={!profile?.wallet?.wallet_address}
                          >
                            NFT 등록
                          </button>
                        )
                      ) : (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteCar(car._id)}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="car-promo-text">등록된 차량이 없습니다.</p>
            )}
          </div>
        </div>

        <ConnectWallet onWalletConnected={handleWalletConnected} />
      </div>
    </div>
  );
}

export default MyPage;
