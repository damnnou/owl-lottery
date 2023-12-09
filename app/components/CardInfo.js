import Image from "next/image";

export default function CardInfo({
  styles,
  title,
  number,
  icon: IconComponent,
}) {
  return (
    <div className={styles + " flex items-center border px-8 h-30 rounded-md"}>
      {<IconComponent className="w-12 h-12" />}
      <div className="ml-8">
        <h3>{title}</h3>
        <p className="font-bold text-3xl">{number}</p>
      </div>
    </div>
  );
}
