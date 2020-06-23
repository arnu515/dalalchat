import React, { useEffect, useState } from "react";
import qs from "querystring";
import io from "socket.io-client";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

let s;
export default ({ location }) => {
  let [n, sn] = useState("");
  let [r, sr] = useState("");
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);
  let serverUrl = "localhost:5001";

  useEffect(() => {
    const data = qs.parse(location.search);
    s = io(serverUrl);
    sn(data["?name"]);
    sr(data.room);

    s.emit("join", { name: data["?name"], room: data.room }, () => {});
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

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      s.emit("messagesent", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className="w3-container">
      <ChatHeader room={r} />
      <Messages messages={messages} name={n} />
      <p>
        <input
          className="w3-input"
          value={message}
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
  );
};
