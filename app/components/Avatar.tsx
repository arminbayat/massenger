"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProbs {
  user?: User;
}
const Avatar: React.FC<AvatarProbs> = ({ user }) => {
    console.log(user?.image)
  return (
    
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image alt="Avatar" src={user?.image || "/images/placeholder.jpg"}  fill/>
      </div>
    </div>
  );
};

export default Avatar;
