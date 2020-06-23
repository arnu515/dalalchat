import React from "react";

export default ({ room, users }) => (
  <div className="w3-modal" id="roominfo">
    <div
      className="w3-modal-content"
      style={{ width: "65%", margin: "2.5rem auto" }}>
      <header className="w3-light-gray w3-bar">
        <span className="w3-bar-item w3-left">Room</span>
        <button
          className="w3-right w3-bar-item w3-button"
          onClick={() =>
            (document.getElementById("roominfo").style.display = "none")
          }>
          X
        </button>
      </header>
      <div className="w3-container">
        <h3>Users:</h3>
        <ul className="w3-ul w3-small">
          {users.map((x, y) => {
            return <li key={y}>{x.name}</li>;
          })}
        </ul>
      </div>
    </div>
  </div>
);
