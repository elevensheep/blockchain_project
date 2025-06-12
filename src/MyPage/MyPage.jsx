import "../Style/MyPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectWallet from "../Component/ConnectWallet";
import useJwtProfile from "../FetchComponent/useJwtProfile";
import useOAuthProfile from "../FetchComponent/useOAuthProfile";
import useDeleteCar from "../FetchComponent/useDeleteCar";
import useOAuthMyCar from "../FetchComponent/useOAuthMyCar";
import useJwtMyCar from "../FetchComponent/useJwtMyCar";
import useNFTStatus from "../FetchComponent/useNFTStatus";
import useAddNFT from "../FetchComponent/useAddNFT";
import NFT from "../Image/NFT.png";

function MyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [carList, setCarList] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [carStatuses, setCarStatuses] = useState({});
  const [nfts, setNfts] = useState([]);

  const jwtToken = sessionStorage.getItem("login_token");
  const oauthToken = sessionStorage.getItem("access_token");
  const oauthProvider = sessionStorage.getItem("oauth_provider");
  const isOAuth = !!oauthToken;
  const token = jwtToken || oauthToken;

  const { JwtProfile, error: jwtError, result: jwtResult } = useJwtProfile();
  const { OAuthProfile, error: oauthError, result: oauthResult } = useOAuthProfile();
  const { deleteCar, loading: deleting, error: deleteError } = useDeleteCar();
  const { OAuthMyCar, result: oauthCarList, error: oauthCarError } = useOAuthMyCar();
  const { JwtMyCar, result: jwtCarList, error: jwtCarError } = useJwtMyCar();
  const { fetchNFTStatuses, nftStatusMap, error: nftError } = useNFTStatus();
  const { AddNFT, loading: minting, error: mintError } = useAddNFT();

  const fetchMyCarList = async () => {
    if (!token) return;
    if (isOAuth) {
      await OAuthMyCar(token);
    } else {
      await JwtMyCar(token);
    }
  };

  const handleDeleteCar = async (carId) => {
    const success = await deleteCar(carId, token);
    if (success) {
      await fetchMyCarList();
    }
  };

  const handleMintNFT = async (car) => {
    if (!profile?.wallet?.wallet_address) {
      alert("지갑이 연결되어 있지 않습니다.");
      return;
    }

    const nftData = {
      tokenId: car.carId,
      owner: profile.wallet.wallet_address,
      metadata: JSON.stringify({
        carSellname: car.carSellname,
        carName: car.carName,
        carType: car.carType,
        carNickname: car.carNickname,
      }),
      price: 0,
    };

    const res = await AddNFT(nftData);
    if (res) {
      alert("✅ NFT 등록 완료");
      await fetchMyCarList();
    } else {
      alert("❌ NFT 등록 실패");
    }
  };

  const handleWalletConnected = (address) => {
    setProfile((prev) => {
      if (prev?.wallet?.wallet_address === address) return prev;
      return {
        ...prev,
        wallet: { ...(prev?.wallet || {}), wallet_address: address },
      };
    });
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      try {
        if (isOAuth) {
          await OAuthProfile(token);
          const oauthData = oauthResult;

          if (!oauthData?.id) throw new Error("OAuth 프로필에 id 없음");

          const res = await fetch("http://localhost:8001/api/users/profile-by-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: oauthData.id }),
          });

          if (!res.ok) throw new Error(`추가 프로필 조회 실패: ${res.status}`);
          const userData = await res.json();

          setProfile({ ...oauthData, ...userData });
          setError(null);
        } else {
          await JwtProfile(token);
          setProfile(jwtResult);
          setError(jwtError);
        }
      } catch (err) {
        setError(err.message || "프로필 불러오기 실패");
      }
    };

    loadProfile();
  }, [jwtToken, oauthToken, oauthResult, jwtResult]);

  useEffect(() => {
    fetchMyCarList();
  }, [jwtToken, oauthToken]);

  useEffect(() => {
    if (isOAuth && oauthCarList) setCarList(oauthCarList);
    if (!isOAuth && jwtCarList) setCarList(jwtCarList);
  }, [oauthCarList, jwtCarList, isOAuth]);

  useEffect(() => {
    if (carList?.cars?.length > 0) {
      const carIds = Array.from(
        new Set(carList.cars.map((car) => car.carId).filter(Boolean))
      );
      fetchNFTStatuses(carIds);
    }
  }, [carList]);

  useEffect(() => {
    const fetchCarDetailStatuses = async (cars) => {
      const updatedStatuses = {};
      for (const car of cars) {
        try {
          const res = await fetch(`http://localhost:8001/api/car/detail/${car.carId}`);
          const data = await res.json();

          // ✅ 서버에서 받은 exists 값으로 상태 설정
          updatedStatuses[car.carId] = data.exists === true;
        } catch (e) {
          updatedStatuses[car.carId] = false;
        }
      }
      setCarStatuses(updatedStatuses);
    };

    if (carList?.cars?.length > 0) {
      fetchCarDetailStatuses(carList.cars);
    }
  }, [carList]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = profile?._id || profile?.id;
        if (!userId || !token) return;

        const response = await fetch(`http://localhost:8001/api/transaction/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`거래 조회 실패: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error("🚨 거래 목록 요청 실패:", error.message);
      }
    };

    if ((profile?._id || profile?.id) && token) {
      fetchTransactions();
    }
  }, [profile, token]);

  useEffect(() => {
    const userId = profile?._id || profile?.id;
    if (!userId || !token) return;

    const fetchNFTs = async () => {
      try {
        const res = await fetch(`http://localhost:8001/api/nft/by-owner/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json(); // ← JSON으로 파싱
        setNfts(data.nfts);
      } catch (err) {
        console.error("🚨 NFT 불러오기 실패:", err);
      }
    };

    if (userId && token) {
      fetchNFTs();
    }
  }, [profile, token]);


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
              </>
            ) : (
              <p className="car-promo-text">로딩 중...</p>
            )}
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">내 차 정보</h3>
          <div className="info-card">
            {(oauthCarError || jwtCarError) ? (
              <p style={{ color: "red", textAlign: "center" }}>
                {oauthCarError || jwtCarError}
              </p>
            ) : carList?.cars?.length > 0 ? (
              <div className="car-list-grid">
                {carList.cars.map((car) => {
                  const nft = nftStatusMap[car.carId];
                  const isMyNFT = nft?.owner === profile?.wallet?.wallet_address;
                  const matchingTransaction = transactions.find(
                    (tx) => tx.car_id === car.carId && tx.status === "pending"
                  );
                  const isSelling = carStatuses[car.carId]; // ✅ 각 차량별 판매 여부 확인
                  console.log(isSelling)
                  return (
                    <div className="car-card" key={car.carId || car._id}>
                      {isOAuth ? (
                        nft ? (
                          <div style={{ color: isMyNFT ? "green" : "gray" }}>
                            <img src={NFT} alt="NFT" />
                          </div>
                        ) : (
                          <button
                            className="mint-button"
                            onClick={() => handleMintNFT(car)}
                            disabled={!profile?.wallet?.wallet_address || minting}
                          >
                            {minting ? "등록 중..." : "NFT 등록"}
                          </button>
                        )
                      ) : (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteCar(car._id)}
                          disabled={deleting}
                        >
                          {deleting ? "삭제 중..." : "삭제"}
                        </button>
                      )}

                      <div className="car-name">{car.carSellname} ({car.carName})</div>
                      <div className="car-price">차량 타입: {car.carType}</div>
                      {isOAuth && (
                        matchingTransaction ? (
                          <button onClick={() => navigate(`/transaction/${matchingTransaction._id}`)}>
                            거래 보기
                          </button>
                        ) : isSelling ? (
                          <button disabled style={{ backgroundColor: "#ccc", color: "#333" }}>
                            판매중
                          </button>
                        ) : (

                          <button
                            onClick={() =>
                              navigate('/nftSell', {

                                state: {
                                  profileId: profile.id,
                                  profilePhone: profile.mobileNum,
                                  carId: car.carId,
                                  manufacturer: "genesis",
                                  model: car.carName,
                                  type: car.carType,
                                },
                              })
                            }
                          >
                            NFT 차량 판매
                          </button>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="info-card">
                      <p className="car-promo-text">등록된 차량이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
        {!isOAuth && (
          <div>
            <h3 className="section-title">거래 정보</h3>
            <div className="info-card">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction._id} className="car-card">
                    <p><strong>거래 ID:</strong> {transaction._id}</p>
                    <p><strong>차량 ID:</strong> {transaction.car_id}</p>
                    <p><strong>판매자:</strong> {transaction.seller_id}</p>
                    <p><strong>구매자:</strong> {transaction.buyer_id}</p>
                    <p><strong>상태:</strong> {transaction.status}</p>
                    <button onClick={() => navigate(`/transaction/${transaction._id}`)}>
                      거래 상세 보기
                    </button>
                  </div>
                ))
              ) : (
                <p className="car-promo-text">거래 내역도 없습니다.</p>
              )}
            </div>
          </div>

        )}

        {mintError && <p style={{ color: "red" }}>NFT 등록 오류: {mintError}</p>}
        {deleteError && <p style={{ color: "red" }}>차량 삭제 오류: {deleteError}</p>}
        {nftError && <p style={{ color: "red" }}>NFT 상태 오류: {nftError}</p>}

        <ConnectWallet onWalletConnected={handleWalletConnected} />
      </div>
    </div>
  );
}

export default MyPage;
