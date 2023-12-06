import Image from "next/image";

export default function CardInfo({ styles, title, number }) {
  return (
    <div className={styles + " flex items-center border px-4 h-30 rounded-md"}>
      <Image
        className="text-black font-bold"
        alt="owlLogo"
        src="/sovaLogo.png"
        width={60}
        height={0}
      />
      <div className="ml-4">
        <h3>{title}</h3>
        <p className="font-bold text-3xl">{number}</p>
      </div>
    </div>
  );
}
