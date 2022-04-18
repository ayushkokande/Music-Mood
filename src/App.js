import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import SpeechToText from "./SpeechToText";
import io from "socket.io-client";
import axios from "axios";

function App() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const socket = io("http://localhost:4000/");
  socket.emit("wow", "puss");
  socket.on("hey", (data) => {
    console.log(data);
  });
  socket.on("playlistId", (data) => {
    console.log(data);
    setPlaylistUrl(`https://open.spotify.com/playlist/${data.playlistId}`);
  });

  // const [token, setToken] = useState("");

  return (
    <div>
      {/* <div style={{ minWidth: "30vw" }}>
        {window.location.href.split("?")[0].split("=")[1] == "true"
          ? "token received"
          : "Access Token give"}
      </div> */}
      {/* <button
        onClick={() => {
          axios
            .get("http://localhost:4000/login")
            .then((res) => console.log(res));
        }}
      >
        GetAccessToken
      </button> */}

      {playlistUrl.length > 0 ? <a href={playlistUrl}>Open Playlist!</a> : null}
      {/* {window.location.href.split("?")[0].split("=")[1] == "true" ? ( */}
      <SpeechToText />
      {/* ) : null} */}
    </div>
  );
}

export default App;
