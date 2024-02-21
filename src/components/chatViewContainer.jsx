import Chat from "./chat";

export default function ChatViewContainer({ user, receiver, fetchChat,toogle }) {
  
    return (
    <div className={"   p-6  sm:p-10  md:block  w-full bg-gray-100" + ( toogle && " hidden ")}>
      <div className=" h-full  w-full">
        {!receiver && (
          <h1 className=" text-gray-500 font-semibold text-center">
            Select a chat or start a new Conversation
          </h1>
        )}
        {receiver && <Chat user={user} fetchChat={fetchChat} receiver={receiver} />}
      </div>
    </div>
  );
}
