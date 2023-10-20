import getConversationById from "@/app/actions/getConversationById";
import getMassages from "@/app/actions/getMassages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";

interface Iparams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(params.conversationId);
  const massages = await getMassages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
      </div>
    </div>
  );
};

export default ChatId;
