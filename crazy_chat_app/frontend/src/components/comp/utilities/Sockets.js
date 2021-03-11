import { get_message } from "./MsgArea";

var chatSocket;

const close_connection = () => {
  try {
    chatSocket.close();
  } catch (err) {}
};

const connectSocket = (roomCode) => {
  close_connection();
  chatSocket = new WebSocket(
    "ws://" + window.location.host + "/ws/chat-room/" + roomCode + "/"
  );

  chatSocket.onopen = (e) => {
    console.log("connection esatablished");
    // fetch the previous message of the chat
  };
  chatSocket.onerror = (e) => {
    alert(`[ERROR] ${e.message}`);
  };

  chatSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    // set message to the state msg
    get_message(data["message"]);
  };

  chatSocket.onclose = (e) => {
    console.log("connection died");
  };
};

const send_message = (msg, setmsg) => {
  try {
    msg = localStorage.getItem("username") + ": " + msg;
    chatSocket.send(
      JSON.stringify({
        message: "" + msg,
      })
    );
    setmsg("");
  } catch (err) {}
};

export { send_message };
export { connectSocket };
