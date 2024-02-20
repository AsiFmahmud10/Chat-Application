import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
   

  const handleLoginByEmail = () => {
    const emailDto = {
      email,
    };
    axios
      .post("http://localhost:8082/api/users/email", emailDto, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(["from Login", res.data]);
        if (res.data) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }

  const onKeyDown =(e)=>{
    if(e.key == 'Enter'){
      handleLoginByEmail()
    }   
  }
  return (
    <div
      className="
      flex flex-col 
      justify-center 
      items-center 
      bg-gray-100 
      min-h-screen 
    "
    >
      <div className="  sm:w-full sm:max-w-md   ">
        <div
          className="
          text-center
          text-3xl
          font-semibold
          tracking-tight
          text-gray-700 
          p-7 mb-4
        "
        >
          Sign to your account
        </div>
        <div className="bg-white rounded-sm sm:rounded-lg p-8 shadow">
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

          <Input className="border-0 ring-1 ring-gray-200 my-2 outline-none "
            id="email" type="email" value={email} placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={onKeyDown}
          />
          <div className="mt-3">
            <Button
              type="submit"
              className="
          bg-green-500 
            
            mx-2
            font-bold
            text-sm
            hover:bg-green-600
            "
              onClick={handleLoginByEmail}
            >
              Sign in
            </Button>

            <Button
              type="submit"
              variant="outline"
              onClick={() => {
                console.log("err");
                navigate("/reg");
              }}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
