import React from "react";
import { FaHashtag } from "react-icons/fa";
import { clear_message } from "./MsgArea";

const Room = ({ room, ConnectSocket }) => {
  const getConnect = async () => {
    ConnectSocket(room.room_code);
    clear_message();
  };

  return (
    <>
      <div className="room-card" onClick={getConnect}>
        <div className="">
          <FaHashtag />
          <span>
            <p>{room.room_name}</p>
            <br />
            <p
              style={{ fontSize: "15px", fontStyle: "Aleo", color: "#323232" }}
            >
              Code: {room.room_code}
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Room;
