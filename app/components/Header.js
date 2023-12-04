"use client";

export default function Header({ account, isLoading, enableWeb3 }) {
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
          onClick={() => enableWeb3()}
          disabled={isLoading}
        >
          Connect
        </button>
      )}
    </div>
  );
}
