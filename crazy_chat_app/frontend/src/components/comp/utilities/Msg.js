import React from "react";

const Msg = ({ message }) => {
  const split_message = message.split(":");
  const user = split_message[0];
  const msg = split_message[1];
  var status = false;
  const currentuser = localStorage.getItem("username")
  if (user == currentuser) {
    status = true;
  }

  return (
    <>
      {status === false ? (
        <>
          <div className="media media-chat">
            <div className="media-body">
              <p>
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontFamily: "Aleo",
                    fontSize: "15px",
                    marginBottom: "0px",
                    paddingLeft: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  {user}
                </p>
                {msg}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="media media-chat media-chat-reverse">
            <div className="media-body media-para">
              <p>{msg}</p>
              {/* <p class="meta">
            <time datetime="2018">00:12</time>
          </p> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Msg;
