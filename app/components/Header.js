"use client";
import { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { ethers } from "ethers";

export default function Header({ account, isLoading, toggleWeb3 }) {
  const [balance, setBalance] = useState(null);

  const setWallet = async () => {
    if (account) {
      setBalance(
        (
          await new ethers.BrowserProvider(window.ethereum).getBalance(account)
        ).toString()
      );
    }
  };

  useEffect(() => {
    setWallet();
  }, [account]);

  return (
    <div className="flex items-center justify-between px-12 py-4 border">
      <div className="flex items-center mr-auto gap-10">
        <Image
          className="text-black font-bold"
          alt="owlLogo"
          src="/sovaLogo.png"
          width={60}
          height={0}
        />
        <h3 className="font-bold text-3xl">Owl Winner</h3>
        {account && (
          <>
            <p>My games:</p>
            <p>
              My wallet:{" "}
              <span className="font-bold">
                {balance && ethers.formatUnits(balance).slice(0, 6) + " ETH"}
              </span>
            </p>
          </>
        )}
      </div>
      <div className="flex items-center ml-auto gap-10">
        <Button
          styles="cursor-default"
          text={
            account
              ? account.slice(0, 6) +
                "..." +
                account.slice(account.length - 4, account.length)
              : "Guest"
          }
        />
        <Button
          disabled={isLoading}
          handleClick={async () => await toggleWeb3()}
          styles="bg-green-100"
          text={account ? "Disconnect" : "Connect Wallet"}
        />
      </div>
    </div>
  );
}
