import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [chats, setChats] = useState([]); // State to store the array
  const [newChatText, setNewChatText] = useState(''); // State to store the user's query

  const id = localStorage.getItem('id');

  const loadChats = () => {
    axios.post('http://localhost:3000/chats', { id })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.chats); // Assuming the array is in res.data.chats
          setChats(res.data.chats); // Update the state with the array
        } else {
          console.log('Error');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const loadResponse = () => {
    const OPENROUTER_API_KEY = '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';
    
    axios.post('https://openrouter.ai/api/v1/chat/completions', {
    model: 'mistralai/mixtral-8x7b-instruct',
    messages: [
      { role: 'user', content: newChatText },
    ],
  }, {
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data); // Log the response from the API
      // Handle the response as needed
    })
    .catch(error => {
      console.error('Error loading response:', error);
    });

  }

  // Call loadChats when the component mounts
  // You might want to trigger this function based on user interactions or other events
  // useEffect(() => {
  //   loadChats();
  // }, []);

  return (
    <div>
      <h1>User id is {id}</h1>
      <button onClick={loadChats}>Load Chats</button>
      <div className='prevChats'>
        {/* Render the chats from the state variable */}
        {chats.map(chat => (
          <div key={chat.id}>
            {/* Render each chat item */}
            {/* Adjust the rendering based on the structure of your chat object */}
            <p>{chat.req}</p>
            <p>{chat.res}</p>
            {/* Add other properties as needed */}
          </div>
        ))}
      </div>
      <div className='newChat'>
          {/** Here there will be a text box where the user will post his query. Then load response api will be called */}
          <textarea
          placeholder='Type your query...'
          value={newChatText}
          onChange={(e) => setNewChatText(e.target.value)}
        />
        <button onClick={loadResponse}>Load Response</button>
      </div>
    </div>
  );
}

export default Home;
