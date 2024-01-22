import React, { useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [chats, setChats] = useState([]); // State to store the array
  const [newChatText, setNewChatText] = useState(""); // State to store the user's query
  const [showPrevChats, setShowPrevChats] = useState(false); // State to control visibility
  const [response, setResponse] = useState(""); // State to store the response from the API

  const id = localStorage.getItem("id");

  const loadChats = () => {
    axios
      .post("http://localhost:3000/chats", { id })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.chats); // Assuming the array is in res.data.chats
          setChats(res.data.chats); // Update the state with the array
          if (!showPrevChats)
            setShowPrevChats(true); // Show prevChats when data is loaded
          else setShowPrevChats(false);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadResponse = async () => {
    const OPENROUTER_API_KEY =
      "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";

    const res=await axios
      .post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mixtral-8x7b-instruct",
          messages: [{ role: "user", content: newChatText }],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setResponse(response.data.choices[0].message.content);

        // Save the chat to the database
        axios
          .post(`http://localhost:3000/savechats/${id}`, {
            id: id,
            req: newChatText,
            res: response,
          })
          .then((saveResponse) => {
            console.log("Chat saved successfully:", saveResponse.data);
            // Optionally, you can load the chats after saving to update the UI
            loadChats();
          })
          .catch((saveError) => {
            console.error("Error saving chat:", saveError);
          });
      })
      .catch((error) => {
        console.error("Error loading response:", error);
      })
      .catch((error) => {
        console.error("Error loading response:", error);
      });
  };

  return (
    <div className="homeContainer">
      <div className="formatHomeContainer">
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
