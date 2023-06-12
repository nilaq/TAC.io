import React from "react";
import Image from "next/image";

const Card = (props: { value: string }) => {
  const selected = false;

  return (
    <div className="relative">
      <Image
        className={`h-full ${selected ? "border-2 border-black" : ""}`}
        src={`/../public/Cards/${props.value}.png`}
        alt={`card with value ${props.value}`}
        width={100}
        height={100}
      ></Image>
    </div>
  );
};

export default Card;
