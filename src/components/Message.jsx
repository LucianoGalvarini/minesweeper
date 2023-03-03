import React, { useEffect } from "react";
import "../App.css";

export default function Message({ msg, styleClass }) {
  const message = "Click on any cell to start playing";

  useEffect(() => {
    if (msg === message) {
      let msgId = document.getElementById("msg");
      msgId.innerHTML = "Click on any cell <br> to start playing";
    }
  }, [msg, message]);

  return (
    <h3
      id="msg"
      className={styleClass}
      dangerouslySetInnerHTML={{ __html: msg }}
    />
  );
}
