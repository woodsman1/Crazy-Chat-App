import React, { useState } from "react";

import Button from "./Button";

const RoomJoin = ({onRoomJoin}) => {

  const [room_code, setcode] = useState("");
  const userid = localStorage.getItem("id");

  const onSubmit = () => {
    if (room_code === "") {
      alert("Code can not be Empty");
      return;
    }
    onRoomJoin({ userid: userid, room_code });
    setcode("");
  };

  return (
    <>
      <div className="join-room">
        <label>Code: </label>
        <input
          type="text"
          required
          value={room_code}
          onChange={(e) => {
            setcode(e.target.value);
          }}
        />

        <Button
          btn_type="success"
          text="Join"
          type="submit"
          onCick={onSubmit}
        />
      </div>
    </>
  );
};

export default RoomJoin;
