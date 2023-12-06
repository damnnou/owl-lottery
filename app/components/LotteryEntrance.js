"use client";
import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { abi, contractAddress } from "../constants";
import Image from "next/image";

export default function LotteryEntrance({ account }) {
  let chainId, signer;
  const [entranceFee, setEntranceFee] = useState("");
  const [raffle, setRaffle] = useState(null);

  const configureContract = async () => {
    chainId = parseInt(
      await window.ethereum.request({ method: "eth_chainId" })
    );
    signer = await new ethers.BrowserProvider(window.ethereum).getSigner(
      account
    );
    if (contractAddress[chainId]) {
      setRaffle(new Contract(contractAddress[chainId][0], abi, signer));
    } else {
      console.log("unsupported network!");
    }
  };

  const enterRaffle = async () => {
    await raffle.enterRaffle({ value: entranceFee });
  };

  const setEntrance = async () => {
    setEntranceFee((await raffle.getEntranceFee()).toString());
  };

  useEffect(() => {
    setRaffle(null);
    account && configureContract();
  }, [account]);

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
