"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import CardInfo from "./CardInfo";

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
        <div className="grid grid-cols-4 gap-12 w-full h-full">
          <div className="col-span-2"></div>
          <CardInfo />
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
