import React, { useEffect, useState } from "react";
import Room from "./Room";
import { connectSocket } from "./Sockets";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchRooms, joinRoom } from "./Auth";
import RoomJoin from "./RoomJoin";

const Rooms = ({ authToken }) => {
  const [channels, setChannels] = useState([]);
  const [togglejoinRoom, setToggleJoinRoom] = useState(false);

  useEffect(() => {
    if (authToken !== "") {
      fetchRooms(authToken, setChannels);
    }
  }, []);

  const onJoin = () => {
    setToggleJoinRoom(!togglejoinRoom);
  };

  const onRoomJoin = async (obj) => {
    joinRoom(authToken, obj);
    fetchRooms(authToken, setChannels);
    setToggleJoinRoom(!togglejoinRoom);
  };
  return (
    <>
      <Link to="/create-room" style={{ textDecoration: "none" }}>
        <MdAdd /> Create New Room
      </Link>

      <div onClick={onJoin} style={{ cursor: "pointer" }}>
        <MdAdd /> Join Room
      </div>

      {!togglejoinRoom ? (
        channels.map((room, index) => (
          <Room key={"" + index} room={room} ConnectSocket={connectSocket} />
        ))
      ) : (
        <RoomJoin onRoomJoin={onRoomJoin} />
      )}
    </>
  );
};

export default Rooms;
