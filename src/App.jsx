import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import "./index.css";
import flower from './assets/flower.png';
import helloKitty from './assets/hello-kitty.png';
import pinkBow from './assets/pink-bow.png';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("");
  const [moodMessage, setMoodMessage] = useState("");

  const login = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      setUser({ email: userCredential.user.email, token });
      alert("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: Invalid credentials");
    }
  };

  
const sendMessage = async () => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch("https://grieve-3.onrender.com/upload-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ content: message, mood }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Unknown error");
    }

    const data = await response.json();
    console.log("Upload response:", data);

      // 🎉 Personalized message based on mood
      let customMessage = "";
      switch (mood) {
        case "😊":
          customMessage = "Your message is sent to Niharika, she will connect to you sooner than you think! She is so happy you're smiling today, stay like this you look 10x hotter 🌞";
          break;
        case "😞":
          customMessage = "Aww baby, your message is sent to Niharika. She will connect to you sooner than you think! But right now, she is sending you the biggest hug ever 🤗💗";
          break;
        case "😠":
          customMessage = "Your message is sent to Niharika. She will connect to you sooner than you think! But she has a message for you – Take a deep breath, my love. We’ll fix it together. ❤️‍🔥";
          break;
        case "💖":
          customMessage = "Aww she loves you toooo! 💞 You’re the cutest boy ever 🥹💘. Your message is sent to Niharika. She will connect to you sooner than you think!";
          break;
        default:
          customMessage = "Thank you for sharing your thoughts babe 💌";
      }

      setMoodMessage(customMessage);
      setMessage("");
      setMood("");

    } catch (err) {
      console.error("❌ Message upload failed:", err.message);
      alert("Message upload failed.");
    }
  };

  useEffect(() => {
    const images = [flower, helloKitty, pinkBow];
    for (let i = 0; i < 10; i++) {
      const img = document.createElement("img");
      img.src = images[Math.floor(Math.random() * images.length)];
      img.className = "floating-deco";
      img.style.top = `${Math.random() * 90}vh`;
      img.style.left = `${Math.random() * 90}vw`;
      document.body.appendChild(img);
    }
  }, []);

  return (
    <div className="game-container">
      <div className="game-box">
        {!user ? (
          <>
            <h2>💖 Grievance portal for my loverboy 💖</h2>
            <h6>Here you can complain about everything I did that made you upset</h6>
            <input
              type="email"
              placeholder="📧 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>💾 Login</button>
          </>
        ) : (
          <>
            <h2>🎮 Welcome, {user.email} baby, what did I do today?</h2>
            <textarea
              rows="4"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">Select Mood</option>
              <option value="😊">Happy 😊</option>
              <option value="😞">Sad 😞</option>
              <option value="😠">Angry 😠</option>
              <option value="💖">In Love 💖</option>
            </select>
            <button onClick={sendMessage}>💌 Send Message</button>

            {/* 🌟 Mood message popup */}
            {moodMessage && (
              <div className="mood-popup">
                {moodMessage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
