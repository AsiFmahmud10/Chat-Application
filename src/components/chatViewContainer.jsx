import Chat from "./chat";

export default function ChatViewContainer({
  user,
  receiver,
  fetchChat,
  toogle,
}) {

  console.log(["chatContainer",fetchChat]);


  return (
    <div
      className={
        " p-2  py-12 sm:block   w-full bg-gray-100" +
        (toogle && " hidden ")
      }
    >
      <div className=" h-full  w-full ">
        {!receiver && (
          <h1 className=" text-gray-500 font-semibold text-center">
            Select a chat or start a new Conversation
          </h1>
        )}
        {receiver && (
          <Chat user={user} fetchChat={fetchChat} receiver={receiver} />
        )}
      </div>
    </div>
  );
}
