import React from "react";
import Stb from "react-scroll-to-bottom";
import Message from "./Message";

export default ({ messages, name }) => (
  <Stb>
    <ul className="w3-ul">
      {messages.map((m, i) => {
        return <Message message={m} name={name} key={i} />;
      })}
    </ul>
  </Stb>
);
