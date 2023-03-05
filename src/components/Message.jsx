import React, { useEffect, useRef } from "react";
import "../App.css";

export default function Message({ msg, styleClass }) {
  const msgRef = useRef(null);

  useEffect(() => {
    let words = msg.split(" ");
    if (words.length > 4) {
      let truncatedMsg = words.slice(0, 4).join(" ");
      let restOfMsg = words.slice(4).join(" ");
      msgRef.current.innerHTML = `${truncatedMsg}<br>${restOfMsg}`;
    } else {
      msgRef.current.innerText = msg;
    }
  }, [msg]);

  return (
    <h3 id="msg" className={styleClass} ref={msgRef}>
      {msg}
    </h3>
  );
}
