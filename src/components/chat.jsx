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

  console.log(["chat",fetchChat]);

  useEffect(() => {
    console.warn(["fetching chat", fetchChat]);
    updateChat();
  }, [receiver, fetchChat]);

  //send signal
  const send = () => {
    if (stompClient) {
      stompClient.publish({
        destination: `/app/notify-${user.id + "-" + receiver.id}`,
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
        send();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateChat = () => {
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

  return (
    <div className=" ">
      <div className=" bg-white border border-gray-200   lg:mx-28">
        <div className=" p-4  bg-blue-300 text-white font-bold text-lg flex justify-between  ">
          <div className="">Chat</div>
          <div className=" block"> {receiver.firstname}</div>
        </div>

        {/* chat view */}
        <div className="h-[380px] p-4 border overflow-y-auto border-gray-200  bg-white mb-2 ">
          <div className="   ">
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
                        ` group rounded-sm  text-left  break-all w-max px-4  max-w-[112px]  md:max-w-sm py-1 text-sm font-semibold  ` +
                        (msg.senderId == user.id
                          ? " bg-blue-300 text-white  text-end "
                          : " bg-green-400 text-white text-end")
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
          </div>
          <div ref={scrollRef}></div>
        </div>

        {/* Sending Message */}

        <div className="flex px-4  py-2 gap-1 max-w-md items-center">
          <Input
            type="text"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            value={msg}
            placeholder="send"
            onKeyDown={handleEnter}
          />

          <Button className="my-1  bg-blue-300" onClick={sendMsg}>
            {" "}
            <ArrowRight />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
