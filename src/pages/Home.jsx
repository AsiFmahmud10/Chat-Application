import ChatView from "@/components/chatView";
import axios from "axios";
import { CircleUserIcon, Menu, PlusCircle } from "lucide-react";
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
        <div
          className=" flex bg-red-500 justify-end"
          onClick={() => {
            setToogle(!toogle);
          }}
        >
          {toogle ? <PlusCircle /> : <Menu />}
        </div>
        {/* Sidebar */}
        <div
          className={
            " overflow-y-scroll min-h-96  sm:p-10 s  max-w-sm w-full " +
            (toogle ? " block " : "hidden")
          }
        >
          <div className=" rounded-md p-6 font-semibold text-xl  shadow-md shadow-gray-200 ">
            <div className="  items-center text-sm  font-semibold ">
              <div className="font-bold text-lg mr-2">Welcome</div>
              <div className="text-end">{user && user.firstname}</div>
            </div>
          </div>

          {/* Print Other Members */}
          <div>
            {userList.map((user, index) => (
              <div
                key={user.id}
                onClick={() => {
                  setReceiver(user);
                }}
              >
                <div className={" cursor-pointer hover:bg-neutral-100 p-4 flex items-center  " +
                 ((user.id == receiver.id )? "bg-neutral-100":"")
                }>
                  <div className="mr-3">
                    <CircleUserIcon />
                  </div>
                  <div className=" text-gray-900 text-lg font-medium">
                    {user.firstname}
                  </div>
                </div>
                <div className="border-t-2 border-gray-100 " />
              </div>
            ))}
          </div>
        </div>

        {/*  Chats  */}

        <div className=" p-6  sm:p-10  sm:block  w-full bg-gray-100">
          <div className=" h-full  w-full">
            {!receiver && (
              <h1 className=" text-gray-500 font-semibold text-center">
                Select a chat or start a new Conversation
              </h1>
            )}
            {receiver && (
              <ChatView user={user} notify={notify} receiver={receiver} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
