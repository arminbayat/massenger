"use client";

import { FullConversationType } from "@/app/types";

interface ConversationListProb {
  initialItems: FullConversationType[];
}
const ConversationList: React.FC<ConversationListProb> = ({ initialItems }) => {
  return <div>Conversation</div>;
};

export default ConversationList;
