import React, { useState } from "react";
import Button from "./utilities/Button";

const NewRoom = ({ onCreateRoom }) => {
  const [room_name, setRoomName] = useState("");
  const [room_size, setRoomSize] = useState(5);

  const onSubmit = () => {
    const id = localStorage.getItem("id");
    if (room_name === "" && room_size > 1) {
      alert("Enter Room Name required and Room size must be greater than 1");
      return
    }
    onCreateRoom({room_name, room_size, room_code:"1", members:[id]})
    setRoomName("")
    setRoomSize(5)
  };

  return (
    <div className="create shadow-lg p-3 mb-5 bg-white rounded">
      <h2>Login</h2>
      <label>Room Name: </label>
      <input
        type="text"
        required
        value={room_name}
        onChange={(e) => {
          setRoomName(e.target.value);
        }}
      />

      <label>Room Size: </label>
      <input
        type="number"
        required
        value={room_size}
        onChange={(e) => {
          setRoomSize(e.target.value);
        }}
      />

      < Button
        btn_type="primary"
        text="Create Room"
        type="submit"
        onCick={onSubmit}
      />
    </div>
  );
};

export default NewRoom;
