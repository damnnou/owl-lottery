"use client";
import Button from "./Button";
import Image from "next/image";

export default function Header({ account, isLoading, toggleWeb3 }) {
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
            <p>My wallet:</p>
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
