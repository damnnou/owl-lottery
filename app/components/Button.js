"use client";

export default function Button({ text, styles, handleClick }) {
  return (
    <button
      onClick={() => handleClick && handleClick()}
      className={
        styles +
        " flex items-center justify-center min-w-[150px] px-4 h-14 border border-black"
      }
    >
      <span>{text}</span>
    </button>
  );
}
