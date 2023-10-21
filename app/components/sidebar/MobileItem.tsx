"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobilteItemProbs {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobilteItem: React.FC<MobilteItemProbs> = ({
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const hanldleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
        active && "bg-gray-100 text-black"
      )}
      onClick={hanldleClick}
      href={href}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobilteItem;
