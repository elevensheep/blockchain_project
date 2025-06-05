import React, { useState, useEffect, useRef } from 'react';
import '../Style/ConnectWallet.css';

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isRequestingRef = useRef(false);

  const connectWallet = async () => {
    if (isRequestingRef.current) {
      alert("이미 연결 요청이 진행 중입니다. 잠시만 기다려주세요.");
      return;
    }

    if (account) {
      alert("이미 지갑이 연결되어 있습니다.");
      return;
    }

    if (!window.ethereum) {
      alert("🦊 MetaMask를 설치해주세요!");
      return;
    }

    try {
      isRequestingRef.current = true;
      setIsLoading(true);

      // 1. 메타마스크로부터 계정 요청
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      setAccount(walletAddress);

      // 2. 로그인 토큰 확인
      const access_token = sessionStorage.getItem("login_token");
      if (!access_token) {
        alert("로그인이 필요합니다.");
        return;
      }

      // 3. 백엔드로 지갑 주소 전송 (JWT 포함)
      const response = await fetch('http://localhost:5000/api/users/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ wallet_address: walletAddress })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`서버 응답 오류: ${response.status} - ${errText}`);
      }

      const result = await response.json();
      console.log('✅ 지갑 주소 서버 전송 결과:', result);
      alert("✅ 지갑 주소 저장 성공!");

    } catch (error) {
      console.error("❌ Wallet connection failed:", error);

      if (error.code === -32002) {
        alert("MetaMask에서 이미 요청을 처리 중입니다. 메타마스크 창에서 요청을 승인해 주세요.");
      } else {
        alert("❌ 지갑 연결 실패 또는 서버 오류");
      }

    } finally {
      isRequestingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 페이지 로드시 이미 연결된 지갑 확인
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (e) {
          console.error('eth_accounts 요청 실패', e);
        }
      }
    };

    checkConnectedWallet();
  }, []);

  return (
    <div className="wallet-section">
      <button
        className="wallet-connect-btn"
        onClick={connectWallet}
        disabled={isLoading}
        type="button"
      >
        {isLoading ? "⏳ 연결 중..." : account ? "🔗 연결됨" : "🦊 MetaMask 지갑 연결"}
      </button>

      {account && (
        <p className="wallet-address">연결된 지갑 주소: {account}</p>
      )}
    </div>
  );
};

export default ConnectWallet;
