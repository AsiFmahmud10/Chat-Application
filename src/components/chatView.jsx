import axios from "axios";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ChatView({ receiver, user }) {
  
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(null);
  
  const sendMsg = () => {
    const msgDto = {
      // senderId;
      receiverId: receiver.id,
      msg,
    };

    axios
      .post("http://localhost:8082/message", msgDto, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        
        updateChat()
        setMsg("")
        // if (res.data) {
        //   navigate("/home");
        // }
      });
  };

  const updateChat=()=>{
    axios
    .post(
      "http://localhost:8082/message/reciever",
      { receiverId: receiver.id },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res.data);
       setChat(res.data)
       
      // if (res.data) {
      //   navigate("/home");
      // }
    });
  }

  useEffect(() => {
    updateChat()
  }, [receiver]);

  return (
    <div className=" bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between px-3 drop-shadow-md ">
        <div>ChatView</div>
        <div> rcvr name : {receiver.username}</div>
        <div> id: {receiver.id}</div>
      </div>
      <div className="mt-3 border-2 border-gray-100  " />
      <div>receiever {receiver.username}</div>
     
      <div className="h-[300px] bg-white mb-2 ">
          {chat && chat.map((msg)=>(
            <div key={msg.id}>
                <div className={ `` +((msg.senderId == user.id)?" text-start ":" text-end") } >

                  <div className={ `rounded-lg w-max  p-3 ` +((msg.senderId == user.id)?"bg-green-400 text-start ":"bg-red-500 text-end") }>{msg.content}</div>
                </div>
              
                
            </div>
          ))}


      </div>
      <div>
        <Input
          type="text"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          value={msg}
          placeholder="send"
        />

        <Button onClick={sendMsg}>send message</Button>
      </div>
    </div>
  );
}
