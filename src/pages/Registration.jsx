import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationDto = {
      email,
      username: userName,
      password,
    };
    axios
      .post("http://localhost:8082/api/users", registrationDto,{withCredentials:true})
      .then((res) => {
        console.log(res.data);
        if(res.data){
          navigate("/home")
        }
      });
  };

  return (
    <div className="flex pt-6 justify-center ">
      <div className=" w-1/2  ">
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Email"
          />
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <Button type="submit" className="bg-green-500">
            Submit
          </Button>
        </form>
        <div>
           <Link to={"/login"}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
