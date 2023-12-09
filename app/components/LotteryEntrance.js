"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import CardInfo from "./CardInfo";

import {
  FcDebt,
  FcClock,
  FcConferenceCall,
  FcSalesPerformance,
  FcPieChart,
  FcRating,
  FcInternal,
} from "react-icons/fc";

export default function LotteryEntrance({
  account,
  raffle,
  signer,
  isLoading,
}) {
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
        <div className="grid grid-cols-4 grid-rows-5 gap-12 w-full h-full transition-opacity ease-in-out duration-700 animate-entry">
          <div className="col-span-2 row-span-4 bg-center bg-cover bg-[url(/scale_2400.png)] rounded-md flex items-center justify-center">
            <button
              onClick={async () => await enterRaffle()}
              className="bg-white w-48 mt-auto mb-12 py-4 font-bold text-xl px-4"
            >
              Enter Raffle
            </button>
          </div>
          <div className="relative row-span-4 bg-neutral-100 rounded-md">
            <div className="bg-green-100 rounded-t-md flex justify-center items-center py-4 border-b">
              <h3 className="text-2xl">Rules</h3>
            </div>
            <div className="flex flex-col my-8 px-4 items-center justify-start h-full">
              <h3 className="text-2xl font-bold">Specify the smaller number</h3>
              <p className="mt-8">
                You must determine which number is smaller and press the button
                with the correct answer
              </p>
              <p className="mt-8">
                As you pass, you will be shown arithmetic expressions. You need
                to compare them and indicate which number is smaller
              </p>
              <Image
                className="absolute bottom-8"
                alt="coinsInvest"
                src="/coinsInvest.svg"
                width={200}
                height={0}
              />
            </div>
          </div>
          <div className="row-span-2 bg-blue-200 rounded-md"></div>
          <CardInfo
            icon={FcInternal}
            title="Entrance Fee"
            number={entranceFee && ethers.formatUnits(entranceFee) + " ETH"}
          />
          <CardInfo icon={FcPieChart} title="My winnings" number="1240" />
          <CardInfo
            icon={FcSalesPerformance}
            title="Prize fund"
            number="1 234 770"
          />
          <CardInfo icon={FcClock} title="End of the game" number="01:54:00" />
          <CardInfo icon={FcConferenceCall} title="Online" number="175 678" />
          <CardInfo icon={FcRating} title="Best result" number="175 678" />
        </div>
      ) : (
        <div className="flex flex-col mt-24 items-center ">
          <Image alt="owls" src="/owls.svg" width={400} height={0} />
          {isLoading ? (
            <div className="mt-12 mx-auto">
              <h1 className=" text-2xl">Connecting</h1>
              <Image
                className="mx-auto"
                alt="loading..."
                src="/loading.svg"
                width={60}
                height={0}
              />
            </div>
          ) : (
            <h1 className="mt-12 text-2xl">Please connect your Wallet</h1>
          )}
        </div>
      )}
    </div>
  );
}
