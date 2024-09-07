import { useState } from 'react';
import Card from './Card.js';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    setComments([...comments, { id: Date.now(), value: input, replies: [] }]);
    setInput("");
  };

  const handleRecursiveHelper = (id, text, obj, isEdit) => {
    return obj.map((card) => 
      card.id !== id 
        ? { ...card, replies: handleRecursiveHelper(id, text, card.replies, isEdit) } 
        : isEdit
        ? { ...card, value: text }
        : { ...card, replies: [...card.replies, { id: Date.now(), value: text, replies: [] }] }
    );
  }

  const handleAddReply = (card, replyText) => {
    setComments(handleRecursiveHelper(card.id, replyText, comments, false));
  };

  const handleDeleteHelper = (id, obj) => 
    obj.filter(card => card.id !== id).map(card => ({
      ...card,
      replies: handleDeleteHelper(id, card.replies)
    }));

  const handleDelete = (card) => {
    setComments(handleDeleteHelper(card.id, comments));
  }

  const handleEditReply = (card, editText) => {
    setComments(handleRecursiveHelper(card.id, editText, comments, true));
  }

  return (
    <div className="App">
      <div className='comment_container'>
        <input 
          type="text" 
          placeholder='Add Comment' 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button 
          onClick={handleAddComment} 
          disabled={!input.trim()}
        >Add Comment</button>
      </div>
      <div>
        {comments.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            handleAddReply={handleAddReply} 
            handleDelete={handleDelete} 
            handleEditReply={handleEditReply}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
