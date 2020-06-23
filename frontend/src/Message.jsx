import React from "react";
import emoji from "react-emoji";

export default ({ message: { user, text }, name: tn }) => {
  tn = tn.trim();
  const isSentByCurrent = user === tn;

  return isSentByCurrent ? (
    <li className="w3-blue">
      {emoji.emojify(text)} <span className="w3-tiny w3-opacity">by YOU</span>
    </li>
  ) : user === "admin" ? (
    <li className="w3-green w3-center">{text}</li>
  ) : (
    <li className="w3-light-gray">
      {emoji.emojify(text)}{" "}
      <span className="w3-tiny w3-opacity">by {user}</span>
    </li>
  );
};
