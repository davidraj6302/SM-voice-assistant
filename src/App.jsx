import React, { useState, useEffect } from "react";
import "./App.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

function App() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // Disclaimer on load
  useEffect(() => {
    const disclaimer =
      "Disclaimer: This voice assistant is designed only for opening social media apps.";
    setResponse(disclaimer);
    speak(disclaimer);
  }, []);

  const startListening = () => {
    setTranscript("");
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  const handleCommand = (text) => {
    const command = text.toLowerCase();
    let res = "";

    const openSite = (message, url) => {
      res = message;
      setResponse(res);
      speak(res);
      window.open(url, "_blank");
      stopListening(); // stop after action
    };

    if (command.includes("open google")) {
      openSite("Opening Google...", "https://google.com");
    } else if (command.includes("open youtube")) {
      openSite("Opening YouTube...", "https://youtube.com");
    } else if (command.includes("open instagram")) {
      openSite("Opening Instagram...", "https://instagram.com");
    } else if (command.includes("open facebook")) {
      openSite("Opening Facebook...", "https://facebook.com");
    } else if (command.includes("open whatsapp")) {
      openSite("Opening WhatsApp Web...", "https://web.whatsapp.com");
    } else if (command.includes("open twitter")) {
      openSite("Opening Twitter...", "https://twitter.com");
    } else if (command.includes("open linkedin")) {
      openSite("Opening LinkedIn...", "https://linkedin.com");
    } else if (command.includes("open snapchat")) {
      openSite("Opening Snapchat...", "https://snapchat.com");
    } else if (command.includes("open telegram")) {
      openSite("Opening Telegram Web...", "https://web.telegram.org");
    } else if (command.includes("open reddit")) {
      openSite("Opening Reddit...", "https://reddit.com");
    } else if (command.includes("open pinterest")) {
      openSite("Opening Pinterest...", "https://pinterest.com");
    } else if (command.includes("open discord")) {
      openSite("Opening Discord...", "https://discord.com");
    } else {
      res = "Only social media opening commands are supported.";
      setResponse(res);
      speak(res);
      stopListening();
    }
  };

  recognition.onresult = (event) => {
    const result = event.results[event.resultIndex][0].transcript.trim();
    setTranscript(result);
    handleCommand(result);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  return (
    <div className="container">
      <h1>🎙️ Social Media Voice Opener</h1>
      <p>Say commands like "open Instagram" or "open YouTube".</p>

      <button onClick={startListening} disabled={listening}>
        🎤 Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        ⏹️ Stop Listening
      </button>

      <div className="transcript-box">
        <strong>You said:</strong>{" "}
        {transcript || "Say a social media command..."}
      </div>

      <div className="response-box">
        <strong>Assistant:</strong> {response}
      </div>

      <footer>© {new Date().getFullYear()} Social Media Voice Opener</footer>
    </div>
  );
}

export default App;
