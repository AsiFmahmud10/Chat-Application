import ChatView from "@/components/chatView";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { CircleUserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userList, setUserList] = useState([
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
    { username: "nasiv" },
  ]);

  const [user, setUser] = useState();

  const [receiver, setReceiver] = useState(null);
  const nevigate = useNavigate();

  const getUsers = () => {
    axios
      .get("http://localhost:8082/api/users", { withCredentials: true })
      .then((res) => {
        console.log(["get user", res.data]);
        if (res.data) {
          setUserList(res.data.contacts);
          setUser(res.data.user);
        } else {
          // nevigate("/reg");
        }
      })
      .catch(() => {
        // nevigate("/reg");
      });
  };

  const handleSearch = (e) => {};

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="  w-full min-h-screen h-full  flex  ">
        <div className=" p-6  sm:p-10 sm:max-w-sm w-full ">
          <div className=" rounded-md p-6 font-semibold text-xl shadow-md shadow-gray-200 ">
            Chats
          </div>
          Current user {user && user.firstname}
          <Input
            type="search"
            onClick={() => {
              getUsers();
            }}
            onChange={handleSearch}
          />

          <div className="">
            {userList.map((value, index) => (
              <div
                onClick={() => {
                  setReceiver(value);
                }}
                key={value.id}
              >
                <div className=" p-4 flex items-center  ">
                  <div className="mr-3">
                    <CircleUserIcon />
                  </div>
                  <div className="  text-gray-900 text-lg font-medium">
                    {value.firstname + " " + value.lastname}
                  </div>
                </div>
                <div className="border-t-2 border-gray-100 " />
              </div>
            ))}
          </div>
        </div>
        <div className=" p-6 sm:p-10 hidden sm:block  w-full bg-gray-100">
          <div
            className=" h-full 
          "
          >
            {!receiver && (
              <h1 className=" text-gray-500 font-semibold text-center">
                Select a chat or start a new Conversation
              </h1>
            )}
            {receiver && <ChatView user={user} receiver={receiver} />}
          </div>
        </div>

        <div className=" p-6 sm:p-10 hidden  w-full bg-gray-100">asd</div>
      </div>
    </>
  );
}
