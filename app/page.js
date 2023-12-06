"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Header, Footer, LotteryEntrance } from "./components";
import { abi, contractAddress } from "./constants";

export default function Home() {
  let chainId, provider;
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [raffle, setRaffle] = useState(null);

  const configureContract = async () => {
    chainId = parseInt(
      await window.ethereum.request({ method: "eth_chainId" })
    );
    if (contractAddress[chainId]) {
      setRaffle(new ethers.Contract(contractAddress[chainId][0], abi, signer));
    } else {
      console.log("unsupported network!");
    }
  };

  const toggleWeb3 = async () => {
    setIsLoading(true);

    if (account) {
      window.localStorage.removeItem("connected");
      provider = null;
      setSigner(null);
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
      setSigner(await provider.getSigner());
      setAccount((await provider.getSigner()).address);
      window.localStorage.setItem("connected", "injected");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) return;
    if (window.localStorage.getItem("connected")) {
      toggleWeb3();
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

  useEffect(() => {
    setRaffle(null);
    account && configureContract();
  }, [account]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header
        signer={signer}
        account={account}
        isLoading={isLoading}
        toggleWeb3={async () => await toggleWeb3()}
      />
      <LotteryEntrance
        isLoading={isLoading}
        raffle={raffle}
        account={account}
      />
      <Footer />
    </div>
  );
}
