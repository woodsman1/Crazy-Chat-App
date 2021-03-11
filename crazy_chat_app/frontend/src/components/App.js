import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./comp/Home";
import Login from "./comp/Login";
import Navbar from "./comp/Navbar";
import Signup from "./comp/Signup";
import Cookies from "universal-cookie";
import ChatRooms from "./comp/ChatRooms";
import NewRoom from "./comp/NewRoom";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();

  // take access token from server when fist mounted
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/get-access-token/", {
        credentials: "same-origin",
      });

      const data = await res.json();

      if (
        data["error"] === "Not a valid token" ||
        data["error"] === "No refresh token detected"
      ) {
        setAuthenticated(false);
        throw Error();
      } else {
        setAuthToken(data["token"]);
        setAuthenticated(true);
      }
    } catch (err) {
      console.log("Login again : token not found " + err);
    }
    setLoading(false);
  }, []);

  // add refresh token to Cookie
  const addRefreshToken = (token) => {
    cookies.set("refresh_token", token, { path: "/" });
  };

  // login function
  const onLogin = async (obj) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
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

      const data = await res.json();
      console.log(data);
      setAuthToken(data["token"]);
      setAuthenticated(true);
      addRefreshToken(data["refresh_token"]);
      localStorage.setItem("username", data["username"]);
      localStorage.setItem("id", data["id"]);
    } catch (err) {
      alert("Enter Correct Username and Password");
    }
    setLoading(false);
  };

  //signup function
  const onSignUp = async (obj) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
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

      const data = await res.json();
      console.log(data);

      if (data["created"] == 0) {
        alert(data["error"]);
      } else {
        setAuthToken(data["token"]);
        setAuthenticated(true);
        addRefreshToken(data["refresh_token"]);
        localStorage.setItem("username", data["username"]);
        localStorage.setItem("id", data["id"]);
      }
    } catch (err) {
      alert("Enter Correct Username and Password");
    }
    setLoading(false);
  };

  const onCreateRoom = async (obj) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/get-or-create-room/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "token " + authToken,
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

      const data = await res.json();
      alert(`Room "${data["room_name"]}" Created`);
    } catch (err) {
      alert("Enter Correct Username and Password");
    }
    setLoading(false);
  };

  return (
    <Router>
      <div>
        <Navbar authenticated={authenticated} />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              {loading ? (
                <h1>loading ... </h1>
              ) : (
                <ChatRooms authToken={authToken} />
              )}
            </Route>
            <Route exact path="/login">
              {authenticated ? (
                <Redirect to="/" />
              ) : (
                <Login onLogin={onLogin} />
              )}
            </Route>
            <Route exact path="/sign-up">
              {authenticated ? (
                <Redirect to="/" />
              ) : (
                <Signup onSignUp={onSignUp} />
              )}
            </Route>

            <Route exact path="/create-room">
              {!authenticated ? (
                <Redirect to="/" />
              ) : (
                <NewRoom onCreateRoom={onCreateRoom} />
              )}
            </Route>
            {/* error in logout from the navbar */}
            <Route
              exact
              path="/logout"
              // render={() => {  //remaining
              //   setAuthToken("");
              //   setAuthenticated(false);
              //   console.log("logout successfully");
              // }}
            >
              <Redirect to="/" />;
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
