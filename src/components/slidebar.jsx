import axios from "axios";
import { CircleUserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Sidebar({
  user,
  userList,
  receiver,
  toogle,
  setReceiver,
}) {
  const navigate = useNavigate();

  const handleSignout = () => {
    axios
      .get("http://localhost:8082/api/users/logout", { withCredentials: true })
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <div
      className={
        " overflow-y-scroll max-h-screen py-2 px-8 brder sm:px-2   sm:max-w-[260px] w-full " +
        (toogle ? " block " : "hidden")
      }
    >
      <div className=" rounded-md p-3 py-6 my-3 font-semibold text-xl border border-gray-200  shadow-md shadow-gray-200 ">
        <div className=" px-6 sm:px-1  items-center text-sm  font-semibold ">
          <div className="flex  justify-between">
            <div className="  sm:block font-bold text-blue-800 text-lg mr-2">
              Welcome
            </div>
            <Button
              variant="outline"
              className=" hover:text-white text-red-500 shadow-md hover:bg-red-500 text-sm font-semibold w-[70px]  "
              onClick={handleSignout}
            >
              Sign out
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-end text-blue-950 text-base ">
              {user && user.firstname}
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Print Other Members */}
      <div className=" h-screen border border-gray-100  rounded-lg  shadow-md">
        {userList.map((user, index) => (
          <div
            key={user.id}
            onClick={() => {
              setReceiver(user);
            }}
          >
            <div
              className={
                " cursor-pointer hover:bg-neutral-100 p-4 flex items-center  " +
                (receiver && user.id == receiver.id && "bg-neutral-100")
              }
            >
              <div className="mr-3">
                <CircleUserIcon />
              </div>
              <div className=" text-blue-900 text-lg font-semibold">
                {user.firstname} {user.lastname}
              </div>
            </div>
            <div className="border-t-2 border-gray-100 " />
          </div>
        ))}
      </div>
    </div>
  );
}
