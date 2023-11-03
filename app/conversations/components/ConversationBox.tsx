"use client";

import { FullConversationType } from "@/app/types";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Conversation, User, Massage } from "@prisma/client";

import { format } from "date-fns";

import { useSession } from "next-auth/react";

import clsx from "clsx";
import useOtherUser from "@/app/hooks/useOtherUser";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConverationBoxProb {
  data: FullConversationType;
  selected?: boolean;
}

const ConverationBox: React.FC<ConverationBoxProb> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMassage = useMemo(() => {
    const massages = data.massages || [];
    return massages[massages.length - 1];
  }, [data.massages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeesn = useMemo(() => {
    if (!lastMassage) {
      return false;
    }

    const seenArray = lastMassage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMassage]);

  const lastmassageText = useMemo(() => {
    if (lastMassage?.image) {
      return "sent an image";
    }

    if (lastMassage?.body) {
      return lastMassage?.body;
    }

    return "Started a conversation";
  }, [lastMassage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3`,
        selected ? `bg-neutral-100` : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser?.name}
            </p>
            {lastMassage?.createdAt && (
              <p className="text-xs text-graye-400 font-light">
                {format(new Date(lastMassage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-xs font-light italic`,
              hasSeesn ? "text-gray-500" : "font-medium"
            )}
          >
            {lastmassageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConverationBox;
