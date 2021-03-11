const fetchRooms = async (authToken, setChannels) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/get-or-create-room/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "token " + authToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();

    setChannels(data);
  } catch (err) {}
};

const joinRoom = async (authtoken, obj) => {
  try {
    console.log(obj);
    const res = await fetch("http://127.0.0.1:8000/api/join-room/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "token " + authtoken,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

  } catch (err) {
    alert("Auth Token unalvailable. " + err);
  }
};

export { fetchRooms };
export { joinRoom };
