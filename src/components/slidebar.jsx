import { CircleUserIcon } from "lucide-react";

export default function Slidebar({ user, userList, receiver, toogle,setReceiver }) {
  return (
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
            <div
              className={
                " cursor-pointer hover:bg-neutral-100 p-4 flex items-center  " +
                (receiver && user.id == receiver.id && "bg-neutral-100")
              }
            >
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
  );
}
