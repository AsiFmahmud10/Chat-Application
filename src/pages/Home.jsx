import ChatViewContainer from "@/components/chatViewContainer";
import Slidebar from "@/components/slidebar";
import axios from "axios";
import { Menu, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "react-stomp-hooks";

export default function Home() {
  const nevigate = useNavigate();
  const [toogle, setToogle] = useState(true);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [notify, setNotify] = useState(false);

  useSubscription("/topic/sub", (msg) => {
    setNotify(!notify);
  });

  const getUsers = () => {
    axios
      .get("http://localhost:8082/api/users", { withCredentials: true })
      .then((res) => {
        console.log(["get user", res.data]);
        if (res.data) {
          setUserList(res.data.contacts);
          setUser(res.data.user);
        } else if (res.data.user == null) {
          nevigate("/login");
        }
      })
      .catch((err) => {
        nevigate("/login");
      });
  };

  useEffect(() => {
    getUsers();
  }, [notify]);

  return (
    <>
      <div className=" overflow-hidden  w-full min-h-screen h-full  flex  ">
        <div className=" flex bg-red-500 justify-end"
          onClick={() =>{ setToogle(!toogle)}}
        >
          {toogle ? <PlusCircle /> : <Menu />}
        </div>

        {/* Sidebar */}
        <Slidebar
          user={user}
          receiver={receiver}
          userList={userList}
          toogle={toogle}
          setReceiver={setReceiver}
        />

        {/*  Chats  */}
        <ChatViewContainer receiver={receiver} user={user} notify={notify} />
      </div>
    </>
  );
}
