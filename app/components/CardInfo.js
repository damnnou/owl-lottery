import Image from "next/image";

export default function CardInfo() {
  return (
    <div className="flex items-center border px-4 h-24">
      <Image
        className="text-black font-bold"
        alt="owlLogo"
        src="/sovaLogo.png"
        width={60}
        height={0}
      />
      <div className="">
        <h3>{"title"}</h3>
        <p className="font-bold text-3xl">{"number"}</p>
      </div>
    </div>
  );
}
