import React from "react";
import Image from "next/image";

export interface CardProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  value: string;
  selected: boolean;
  left: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const Card = React.forwardRef<HTMLImageElement, CardProps>(
  ({ value, selected, left, onClick, onDoubleClick, ...props }, ref) => {
    return (
      <Image
        className={`duration-50 absolute aspect-[0.62] w-[100px] cursor-pointer rounded-lg transition-transform ease-in-out ${
          selected
            ? "z-40 scale-[1.05] outline outline-2 outline-black"
            : "hover:z-10 hover:scale-105 "
        }`}
        src={`/../public/Cards/${value}.png`}
        alt={`card with value ${value}`}
        width={0}
        height={0}
        sizes="100vw"
        style={{ left: left }}
        ref={ref}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    );
  }
);
Card.displayName = "Card";

export default Card;
