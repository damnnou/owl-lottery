"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Header() {
  const [account, setAccount] = useState(null);

  const enableWeb3 = async () => {
    let provider;
    let signer;

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      setAccount(signer.address);
    }
  };

  return (
    <div className="">
      {account ? (
        <p>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </p>
      ) : (
        <button
          className="w-64 bg-white border"
          onClick={async () => await enableWeb3()}
        >
          Connect
        </button>
      )}
    </div>
  );
}
