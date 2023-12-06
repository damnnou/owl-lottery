"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import CardInfo from "./CardInfo";

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
        <div className="grid grid-cols-4 grid-rows-5 gap-12 w-full h-full transition-opacity ease-in-out duration-700">
          <div className="col-span-2 row-span-4 bg-black rounded-md"></div>
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
          <div className="row-span-2 bg-black rounded-md"></div>
          <CardInfo styles="" title="My place" number="7 W" />
          <CardInfo styles="" title="My winnings" number="1240" />
          <CardInfo styles="" title="Prize fund" number="1 234 770" />
          <CardInfo styles="" title="End of the game" number="01:54:00" />
          <CardInfo styles="" title="Online" number="175 678" />
          <CardInfo styles="" title="Best result" number="175 678" />
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
