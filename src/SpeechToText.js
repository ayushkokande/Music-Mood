import "./App.css";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

function SpeechToText() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [submit, setSubmit] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="dialog">
          <h1>Music Mood</h1>
          <div
            style={{
              position: "relative",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "start",
              width: "40%",
              gap: "15px",
            }}
          >
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button
              onClick={() => {
                SpeechRecognition.stopListening();
                setSubmit(true);
              }}
            >
              Stop
            </button>
            <button
              onClick={() => {
                resetTranscript();
                setSubmit(false);
              }}
            >
              Reset
            </button>
          </div>
          <div className="textBox">
            {transcript.length ? (
              <p>{transcript}</p>
            ) : (
              <span style={{ color: "rgb(143 143 143)" }}>
                Press start to speak something!
              </span>
            )}
          </div>
          <button
            onClick={() => {
              axios.post("http://localhost:4000/getPlaylists", {
                transcript,
              });
            }}
          >
            Send transcript?
          </button>
        </div>
        {/* {submit ? ( */}
        {/* ) : null} */}
      </div>
    </>
  );
}

export default SpeechToText;
