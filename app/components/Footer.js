"use client";

export default function Footer({ account, isLoading, enableWeb3 }) {
  return (
    <div className="flex mt-auto items-center w-full py-6 px-12 border justify-between">
      <div className="mr-auto">
        <p>© 2023 "Owl Winner". All rights reserved</p>
      </div>
      <ul className="flex ml-auto gap-10">
        <li>Rules of game</li>
        <li>Game info</li>
        <li>About Us</li>
      </ul>
    </div>
  );
}
