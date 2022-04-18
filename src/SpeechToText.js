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
      <div>
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
        <p>{transcript}</p>
      </div>
      {submit ? (
        <button
          onClick={() => {
            axios.post("http://localhost:4000/getPlaylists", {
              transcript,
            });
          }}
        >
          Send transcript?
        </button>
      ) : null}
    </>
  );
}

export default SpeechToText;
