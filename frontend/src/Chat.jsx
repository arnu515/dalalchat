import React, { useEffect, useState } from "react";
import qs from "querystring";
import io from "socket.io-client";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import RoomInfo from "./RoomInfo";

let s;
export default ({ location }) => {
  let [n, sn] = useState("");
  let [r, sr] = useState("");
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);
  let [users, setUsers] = useState([]);
  let serverUrl = "/";

  useEffect(() => {
    const data = qs.parse(location.search);
    s = io(serverUrl);
    sn(data["?name"]);
    sr(data.room);

    s.emit("join", { name: data["?name"], room: data.room }, (error) => {
      if (error) {
        alert(error);
        window.location = "/";
      }
    });
    return () => {
      s.emit("disconnect");
      s.off();
    };
  }, [serverUrl, location.search]);

  useEffect(() => {
    s.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    s.on("roomupdate", ({ users: u }) => {
      setUsers(u);
    });
  }, [users]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      s.emit("messagesent", message, () => {
        setMessage("");
        document.getElementById("messageinput").disabled = true;
        document.getElementById("messageinput").placeholder =
          "Wait 5 seconds before sending message";
        setTimeout(() => {
          document.getElementById("messageinput").disabled = false;
          document.getElementById("messageinput").placeholder =
            "Enter message...";
        }, 5000);
      });
    }
  };

  return (
    <div>
      <RoomInfo room={r} users={users} />
      <ChatHeader room={r} />
      <br />
      <div className="w3-container">
        <Messages messages={messages} name={n} />
        <p>
          <input
            className="w3-input"
            value={message}
            autoFocus={true}
            id="messageinput"
            placeholder="Enter message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(e);
              }
            }}
          />
        </p>
      </div>
    </div>
  );
};
