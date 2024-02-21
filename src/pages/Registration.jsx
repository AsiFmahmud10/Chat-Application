import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStompClient } from "react-stomp-hooks";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname,  setLastname] = useState("");
  const stompClient = useStompClient()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationDto = {
      email,
      firstname,
      lastname,
    };
    axios.post("http://localhost:8082/api/users", registrationDto, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(["registraion done"],res.data);
        if(stompClient){
          stompClient.publish({
            destination: `/app/notify-newUser`,
            body: "hello",
          });
        }
        if (res.data) {
          navigate("/home");
        }else{
          navigate("/reg");
        }
      }).catch((err)=>{
         console.error(err)
         navigate("/reg");   
      });
  };

  return (
    <div className="
      flex flex-col 
      justify-center 
      items-center 
      bg-gray-100 
      min-h-screen 
      ">
      <div className=" sm:w-full sm:max-w-md ">
        <div className="
          text-center
          text-3xl
          font-semibold
          tracking-tight
          text-gray-700 
          p-7 mb-4
        "
        >
          Registration
        </div>
        <div className="bg-white w-full sm:max-w-md rounded-sm sm:rounded-lg p-8 shadow">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="
              text-sm
              font-semibold
              text-gray-900
            "
            >
              Email
            </label>

            <Input
              id="email"
              className="
              border-0
              ring-1
             ring-gray-200
              my-2
              px-5
              outline-none
            "
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Email"
            />
            <label
              htmlFor="  FirstName"
              className="
              text-sm
              font-semibold
              text-gray-900
            "
            >
              First name
            </label>
            <Input
              id="FirstName"
              className="
              border-0
              ring-1
            ring-gray-200
              my-2
              outline-none
             
           "
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              value={firstname}
            />
            <label
              htmlFor="LastName"
              className="
              text-sm
              font-semibold
              text-gray-900
            "
            >
              LastName
            </label>
            <Input
              id="LastName"
              className="
               border-0
               ring-1
              ring-gray-200
                my-4
               outline-none
             "
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              value={lastname}
            />
            <Button
              type="submit"
              className="
             bg-green-500 
              w-full
              mx-2
              font-bold
            "
            >
              Submit
            </Button>
          </form>
          
          <div className="flex justify-center items-center">
            <span className="w-full border border-gray-100"></span>
            <div className="text-sm w-full text-gray-400">Already registerd?</div>
            <span className="w-full border border-gray-100"></span>
          </div>
          <div className="flex text-muted-foreground justify-end">
            
              <Button variant="outline" onClick={()=>{navigate("/login")}}>Login</Button>
          </div>
          
        </div>

       
      </div>
    </div>
  );
}
