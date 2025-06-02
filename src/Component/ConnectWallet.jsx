import React, { useState } from 'react';
import { ethers } from 'ethers';
import '../Style/ConnectWallet.css';

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        setAccount(walletAddress);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log("Signer info:", signer);

        // ✅ fetch 응답을 변수에 저장
        const response = await fetch('http://192.168.202.128:8001/walletAddress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: walletAddress })
        });

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const result = await response.json();
        console.log('서버로부터 받은 응답:', result);

        alert(`서버로 지갑 주소 전송 완료: ${result.address}`);

      } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("지갑 연결 실패 또는 서버 응답 실패");
      }
    } else {
      alert("MetaMask가 설치되어 있지 않습니다.");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? "연결 완료" : "MetaMask 지갑 연결"}
      </button>
      {account && <p>연결된 지갑 주소: {account}</p>}
    </div>
  );
};

export default ConnectWallet;
