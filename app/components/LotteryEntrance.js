"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";

export default function LotteryEntrance({ account, raffle, signer }) {
  const [entranceFee, setEntranceFee] = useState("");

  const setEntrance = async () => {
    setEntranceFee((await raffle.getEntranceFee()).toString());
  };

  const enterRaffle = async () => {
    await raffle.enterRaffle({ value: entranceFee });
  };

  useEffect(() => {
    raffle && setEntrance();
  }, [raffle]);

  console.log("rendered");
  return (
    <div className="flex px-12 py-12 justify-center h-full">
      {raffle ? (
        <div className="flex flex-col w-64">
          Entrance Fee ={" "}
          {entranceFee && ethers.formatUnits(entranceFee, "ether")} ETH
          <button className="border" onClick={async () => enterRaffle()}>
            Enter Raffle
          </button>
        </div>
      ) : (
        <div className="flex flex-col mt-24 items-center">
          <Image alt="owls" src="/owls.svg" width={400} height={0} />
          <h1 className="text-3xl mt-12">Please connect your wallet!</h1>
        </div>
      )}
    </div>
  );
}
