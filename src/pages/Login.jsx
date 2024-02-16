import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationDto = {
      username,
      password,
    };

    // axios
    //   .post("http://localhost:8082/api/users", registrationDto, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data) {
    //       navigate("/home");
    //     }
    //   });
    navigate("/home");
  };

  const handleLoginByEmail = () => {
    const emailDto = {
      email,
    };
    // axios
    //   .post("http://localhost:8082/api/users", emailDto, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data) {
    //       navigate("/home");
    //     }
    //   });

      navigate("/home");
  };

  return (
    <div className="flex pt-6 justify-center ">
      <div className=" w-1/2  ">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={username}
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
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <Button onClick={handleLoginByEmail}>Log in with email</Button>
        </div>
      </div>
    </div>
  );
}
