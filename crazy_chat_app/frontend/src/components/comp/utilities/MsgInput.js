import React, { useState } from "react";
import { send_message } from "./Sockets";
import { FiSend } from "react-icons/fi";

const MsgInput = () => {
  const [msg, setmsg] = useState("");

  const sendMsg = () => {
    send_message(msg, setmsg);
  };

  const sendMsgOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMsg();
    }
  };

  return (
    <>
      <div className="publisher bt-1 border-light shadow p-3 mb-5 bg-white rounded">
        <input
          className="publisher-input"
          type="text"
          required
          placeholder="Enter Message"
          value={msg}
          onChange={(e) => {
            setmsg(e.target.value);
          }}
        />
        <FiSend onClick={sendMsg} size={25} onKeyPress={sendMsgOnKeyPress} />
      </div>
    </>
  );
};

export default MsgInput;
