"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Header, Footer, LotteryEntrance } from "./components";
export default function Home() {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const enableWeb3 = async () => {
    let provider;
    let signer;
    setIsLoading(true);

    if (account) {
      window.localStorage.removeItem("connected");
      provider = null;
      signer = null;
      setIsLoading(false);
      setAccount(null);
      return console.log("successfully logged out");
    }

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
      setIsLoading(false);
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      setAccount(signer.address);
      window.localStorage.setItem("connected", "injected");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) return;
    if (window.localStorage.getItem("connected")) {
      enableWeb3();
    }
  }, [account]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", async () => {
      const accs = window.ethereum._state.accounts;
      if (accs.length > 0) {
        console.log("account changed to", accs[0]);
        setAccount(accs[0]);
      } else {
        console.log("account has been logged out");
        window.localStorage.removeItem("connected");
        setAccount(null);
      }
    });
  }, []);
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header
        account={account}
        isLoading={isLoading}
        enableWeb3={async () => await enableWeb3()}
      />
      <LotteryEntrance account={account} />
      <Footer />
    </div>
  );
}
