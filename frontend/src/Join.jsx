import React from "react";
import { Link } from "react-router-dom";

export default () => {
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");

  return (
    <div
      className="w3-black w3-center"
      style={{ margin: "5rem 2rem", padding: "1rem" }}>
      <h1 className="w3-jumbo">Join</h1>
      <hr className="w3-border-top w3-border-white" />
      <p>
        <label htmlFor="name">NAME</label>
        <input
          className="w3-input"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="room">ROOM</label>
        <input
          className="w3-input"
          type="text"
          id="name"
          onChange={(e) => setRoom(e.target.value)}
        />
      </p>
      <p>
        <Link
          onClick={(e) => {
            if (!name || !room) {
              e.preventDefault();
            }
          }}
          to={`/chat?name=${name}&room=${room}`}>
          <button className="w3-btn w3-white">JOIN</button>
        </Link>
      </p>
    </div>
  );
};
