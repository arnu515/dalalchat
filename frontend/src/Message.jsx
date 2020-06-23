import React from "react";
import emoji from "react-emoji";

export default ({ message: { user, text }, name: tn }) => {
  tn = tn.trim();
  const isSentByCurrent = user === tn;

  return isSentByCurrent ? (
    <li className="w3-blue">
      {emoji.emojify(text)} <span class="w3-tiny w3-opacity">by YOU</span>
    </li>
  ) : (
    <li>
      {emoji.emojify(text)} <span class="w3-tiny w3-opacity">by {user}</span>
    </li>
  );
};
