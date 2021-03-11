import React, { useEffect, useState } from "react";
import Msg from "./Msg";

let outsideUpdate;
let outsideReset;

const get_message = (msg) => {
  try {
    outsideUpdate(msg);
  } catch (err) {}
};

const clear_message = ()=>{
  try{
    outsideReset([])
  }catch(err){}
}

const MsgArea = () => {
  const [newMsg, setNewMsg] = useState("");
  const [recvmsg, setrecvmsg] = useState([]); // error getting empyt state

  useEffect(() => {
    outsideUpdate = setNewMsg;
    outsideReset = setrecvmsg;
  }, []);

  useEffect(() => {
    setrecvmsg([...recvmsg, newMsg]);
  }, [newMsg]);

  return (
    <>
      {recvmsg.map((msg, index) => (
        (msg === '') ? "":
        <Msg key={"" + index} message={msg} />
      ))}
    </>
  );
};

export default MsgArea;
export { get_message };
export { clear_message };
