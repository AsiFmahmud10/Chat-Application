import ChatViewContainer from "@/components/chatViewContainer";
import Sidebar from "@/components/slidebar";
import axios from "axios";
import { Menu, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStompClient, useSubscription } from "react-stomp-hooks";

export default function Home() {
  const nevigate = useNavigate();
  const [toogle, setToogle] = useState(true);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [notify, setNotify] = useState(false);
  const [fetchChat, setFetchChat] = useState(false);

  const stompClient = useStompClient();
  // listining... when msg come from broker callback will call
  useSubscription("/topic/sub", (msg) => {
    console.warn("i revd Message");
    // show new user
    if (msg.bode == "newUser") {
      setNotify(!notify);
    } else {
      const [senderUserId, senderRecieverId] = msg.body.split("-");
      console.log([senderUserId, senderRecieverId]);
      setNotify(!notify);

      if (
        user &&
        receiver &&
        receiver.id == senderUserId &&
        user.id == senderRecieverId
      ) {
        console.warn([receiver.id.toString(), msg.body, fetchChat]);
        setFetchChat(!fetchChat);
        console.warn[fetchChat];
      }
    }
  });

  // fetch other users except the user using
  const getUsers = () => {
    axios
      .get("http://localhost:8082/api/users", { withCredentials: true })
      .then((res) => {
        console.log(["get user", res.data]);
        if (res.data) {
          setUserList(res.data.contacts);
          setUser(res.data.user);
          console.warn("users update");
        } else if (res.data.user == null) {
          nevigate("/");
        }
      })
      .catch((err) => {
        nevigate("/");
      });
  };

  useEffect(() => {
    getUsers();
  }, [notify]);

  useEffect(() => {
    if (stompClient) {
      stompClient.publish({
        destination: `/app/notify-newuser`,
        body: "hello",
      });
    } else {
      console.error(["stompClient"], stompClient);
    }
  }, []);

  return (
    <>
      <div className=" overflow-hidden  w-full min-h-screen h-full  flex  ">
        <div
          className=" flex bg-red-500 justify-end"
          onClick={() => {
            setToogle(!toogle);
          }}
        >
          {toogle ? <PlusCircle /> : <Menu />}
        </div>

        {/* Sidebar */}
        <Sidebar
          user={user}
          receiver={receiver}
          userList={userList}
          toogle={toogle}
          setReceiver={setReceiver}
        />

        {/*  Chats  */}
        <ChatViewContainer
          receiver={receiver}
          user={user}
          toogle={toogle}
          fetchChat={fetchChat}
        />
      </div>
    </>
  );
}
