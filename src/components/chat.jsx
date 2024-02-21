import axios from "axios";

import { ArrowRight, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Chat({ receiver, user, fetchChat }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(null);
  const stompClient = useStompClient();
  const scrollRef = useRef(null);

  //send signal
  const send = () => {
    if (stompClient) {
      stompClient.publish({
        destination: `/app/notify-${user.id+"-"+receiver.id}`,
        body: "hello",
      });
    } else {
      console.error(["stompClient"], stompClient);
    }
  };

  const removeMessage = (msgId) => {
    axios
      .delete(`http://localhost:8082/message/${msgId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(["remove msg", res.data]);
        updateChat(false);
      });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      sendMsg();
    }
  };

  const sendMsg = () => {
    send();
    const msgDto = {
      receiverId: receiver.id,
      msg,
    };

    axios
      .post("http://localhost:8082/message", msgDto, { withCredentials: true })
      .then((res) => {
        console.log(["message sent"], res.data);
        updateChat();
        setMsg("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateChat = (scrollOrnot = true) => {
    axios
      .post(
        "http://localhost:8082/message/reciever",
        { receiverId: receiver.id },
        { withCredentials: true }
      )
      .then((res) => {
        setChat(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat, fetchChat]);

  useEffect(() => {
    updateChat(true);
  }, [receiver, fetchChat]);

  return (
    <div className=" bg-white  rounded-md shadow-md p-6 lg:mx-28">
      <div className=" font-bold text-lg  text-blue-950 flex justify-between px-3 drop-shadow-md ">
        <div className="hidden sm:block">Messages</div>
        <div className=" block"> {receiver.firstname}</div>
      </div>
      <div className="mt-3 border-2 border-gray-300  " />

      {/* chat view */}
      <div className="h-[370px]  overflow-y-auto bg-white mb-2 ">
        {chat &&
          chat.map((msg) => (
            <div key={msg.id}>
              <div
                className={
                  `flex m-3  ` +
                  (msg.senderId == user.id
                    ? " justify-start  text-start "
                    : " justify-end text-end")
                }
              >
                <div
                  className={
                    ` group rounded-lg  text-left  break-all w-max px-4  max-w-[112px]  md:max-w-sm py-1 text-sm font-semibold  ` +
                    (msg.senderId == user.id
                      ? " bg-blue-300 text-white  text-end "
                      : " bg-neutral-100  text-end")
                  }
                >
                  <div className=" flex gap-1 items-center ">
                    <div>{msg.content}</div>
                    <div className="">
                      <Trash
                        className=" cursor-pointer h-3 "
                        onClick={() => {
                          removeMessage(msg.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div ref={scrollRef}></div>
      </div>

      {/* Sending Message */}

      <div className="flex gap-1 max-w-md items-center">
        <Input
          type="text"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          value={msg}
          placeholder="send"
          onKeyDown={handleEnter}
        />

        <Button className="my-3  bg-green-400" onClick={sendMsg}>
          {" "}
          <ArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
}
