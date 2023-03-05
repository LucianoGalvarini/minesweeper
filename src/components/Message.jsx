import React from "react";
import "../App.css";

export default function Message({ msg, styleClass }) {
  const messages = msg.split(". ");
  const messageElements = messages.map((message, index) => (
    <React.Fragment key={index}>
      {message}
      {index !== messages.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <h4 id="msg" className={`message ${styleClass}`}>
      {messageElements}
    </h4>
  );
}
