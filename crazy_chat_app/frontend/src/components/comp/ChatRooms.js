import React, { useState } from "react";
import MsgInput from "./utilities/MsgInput";
import MsgArea from "./utilities/MsgArea";

import Rooms from "./utilities/Rooms";

export const ChatRooms = ({ authToken }) => {
  return (
    <>
      <div className="" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "20px", height: "100vh" }}>
          <div
            className="col shadow p-3 mb-3 bg-white rounded"
            style={{ height: "93vh", marginTop: "0.6%" }}
          >
            <p
              style={{
                fontSize: "25px",
                textAlign: "center",
                marginTop: "7px",
                fontFamily: "Aleo",
              }}
            >
              Room's
            </p>

            <Rooms authToken={authToken} />
          </div>
          <div className="col-9" style={{ marginLeft: "1%", height: "96vh" }}>
            <div className="card msg-area">
              <MsgArea />
            </div>
            {/* input fields */}
            <div className="msg-input-area">
              <MsgInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRooms;
