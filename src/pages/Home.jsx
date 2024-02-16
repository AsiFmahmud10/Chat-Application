import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userList, setUserList] = useState([]);
  const nevigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUserList(res.data);
        } else {
          nevigate("/reg");
        }
      })
      .catch(() => {
        nevigate("/reg");
      });
  }, []);

  return (
    <>
      <div>
        UserList
        {userList.map((value, index)=>(
          <div key={value.id}>{value.username}</div>
        ))}
      </div>
    </>
  );
}
