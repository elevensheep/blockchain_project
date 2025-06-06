import React, { useState, useEffect, useRef } from 'react';
import '../Style/ConnectWallet.css';

const ConnectWallet = ({ onWalletConnected }) => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isRequestingRef = useRef(false);

  const connectWallet = async () => {
    if (isRequestingRef.current || account) {
      alert("이미 지갑이 연결되어 있거나 요청 중입니다.");
      return;
    }

    if (!window.ethereum) {
      alert("🦊 MetaMask를 설치해주세요!");
      return;
    }

    try {
      isRequestingRef.current = true;
      setIsLoading(true);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      setAccount(walletAddress);

      if (onWalletConnected) {
        onWalletConnected(walletAddress); // 🔄 MyPage에 전달
      }

    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
      alert("지갑 연결 실패");
    } finally {
      isRequestingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (onWalletConnected) {
              onWalletConnected(accounts[0]); // 이미 연결된 경우도 전달
            }
          }
        } catch (e) {
          console.error('eth_accounts 요청 실패', e);
        }
      }
    };

    checkConnectedWallet();
  }, [onWalletConnected]);

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
      {account && <p className="wallet-address">연결된 지갑 주소: {account}</p>}
    </div>
  );
};

export default ConnectWallet;
