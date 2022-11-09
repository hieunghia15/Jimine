import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserAPI(token) {
  const [user, setUser] = useState();
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    if (token !== false) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/find", {
            headers: { Authorization: token },
          });
          setUser(res.data.user);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token,callback]);
  return {
    user: [user, setUser],
    callback: [callback, setCallback],
  };
}
