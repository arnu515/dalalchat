import React from "react";

export default ({ room }) => (
  <div className="w3-bar w3-border-bottom w3-border-gray">
    <span className="w3-bar-item w3-center">{room}</span>
    <a href="/" className="w3-bar-item w3-button w3-right">
      Leave room
    </a>
  </div>
);
