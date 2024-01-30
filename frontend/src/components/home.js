import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [chats, setChats] = useState([]); // State to store the array
  const [newChatText, setNewChatText] = useState(""); // State to store the user's query
  const [showPrevChats, setShowPrevChats] = useState(false); // State to control visibility
  const [response, setResponse] = useState(""); // State to store the response from the API
  const [loading, setLoading] = useState(false);
  const [loadingchats, setLoadingchats] = useState(false);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const loadChats = () => {
    if (loadingchats) {
      // If the button is already in a loading state, return early to prevent multiple clicks
      return;
    }
    else{
      setLoadingchats(false)
    axios
      // .post("http://localhost:8080/chats", { id })
      .post("https://healthcarellm-srq1.onrender.com/chats", { id })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.chats); // Assuming the array is in res.data.chats
          setChats(res.data.chats); // Update the state with the array
          if (!showPrevChats)
            setShowPrevChats(true); // Show prevChats when data is loaded
          else setShowPrevChats(false);
        } else {
          console.log("Error");
        }
        setLoadingchats(false)
      })
      .catch((err) => {
        console.log(err);
        setLoadingchats(false)
      });
    }
  };

  const loadResponse = async () => {
    
    if (loading) {
      // If the button is already in a loading state, return early to prevent multiple clicks
      return;
    }
    try {
      setLoading(true)
      const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyATwaCo9bH4JxXswqOVnCmFmfTJDF755AI");


  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = newChatText;
      if(prompt.length===0){ setLoading(false);return}
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);


  
      await setResponse(text);
  
      // Save the chat to the database
      try {
        // `http://localhost:8080/savechats/${id}`,
        const saveResponse = await axios.post(
          `https://healthcarellm-srq1.onrender.com/savechats/${id}`,
          {
            req: newChatText,
            res: text,
          }
        );
          setLoading(false)
        // console.log("Chat saved successfully:", saveResponse.data);
        // Optionally, you can load the chats after saving to update the UI
        // loadChats();
      } catch (saveError) {
        setLoading(false)
        console.error("Error saving chat:", saveError);
      }
    } catch (error) {
      setLoading(false)
      console.error("Error loading response:", error);
    }
  };

  return (
    <div className="homeContainer">
      <div className="formatHomeContainer">
      <button className="logout" onClick={(e)=>{navigate("/Login")}}>
          Logout
        </button>
        <div className="head"> Your HealthCare Assistant</div>
        
        <button className="responseButton" onClick={loadChats}>
          Load Chats
        </button>
        {showPrevChats && (
          <div className="prevChats">
            {chats.map((chat) => (
              <div key={chat.id} className="textContainer">
                <div className="request">{chat.req}</div>
                <div className="response">{chat.res}</div>
                <div style={{ height: "10px", width: "100vw" }}></div>
              </div>
            ))}
          </div>
        )}
        <div className="newChat">
          <textarea
            className="querybox"
            placeholder="Type your query..."
            value={newChatText}
            onChange={(e) => setNewChatText(e.target.value)}
          />
          <button className="responseButton" onClick={loadResponse}>
            Load Response
          </button>
        </div>
        {response && <div className="responseDiv">{response}</div>}
      </div>
    </div>
  );
};

export default Home;