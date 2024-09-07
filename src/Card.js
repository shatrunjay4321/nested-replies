import { useState } from "react";

function Card({ card = {}, handleAddReply, handleDelete, handleEditReply }) {
  const [text, setText] = useState('');
  const [actionType, setActionType] = useState(null); // 'reply' or 'edit'

  return (
    <div style={{ marginLeft: '20px' }}>
      <div className="card_container">
        {card.value}
        {!actionType && (
          <div className="button_container">
            <button onClick={() => setActionType('reply')}>Reply</button>
            <button onClick={() => setActionType('edit')}>Edit</button>
            <button onClick={() => handleDelete(card)}>Delete</button>
          </div>
        )}
      </div>
      {actionType && (
        <div className="reply_container">
          <input
            type="text"
            placeholder={actionType === 'reply' ? "Add a reply" : "Edit reply"}
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={!text.trim()}
            onClick={() => {
              if (actionType === 'reply') {
                handleAddReply(card, text);
              } else {
                handleEditReply(card, text);
              }
              setActionType(null);
              setText("");
            }}
          >
            {actionType === 'reply' ? "Add Reply" : "Edit Reply"}
          </button>
        </div>
      )}
      {card.replies.length > 0 && card.replies.map((reply) => (
        <Card
          key={reply.id}
          card={reply}
          handleAddReply={handleAddReply}
          handleDelete={handleDelete}
          handleEditReply={handleEditReply}
        />
      ))}
    </div>
  );
}

export default Card;
