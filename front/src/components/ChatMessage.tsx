import React from "react";
import { format } from "date-fns";

export interface ChatMessagePayload {
  readonly from: string;
  readonly text: string;
  readonly createAt: number;
}

const ChatMessage: React.FC<{ msg: ChatMessagePayload }> = ({ msg }) => {
  return (
    <>
      <li className="message">
        <div className="message__title">
          <h4>{msg.from}</h4>
          <span>시간</span>
        </div>
        <div className="message__body">
          <p>{msg.text}</p>
        </div>
      </li>
    </>
  );
};

export default ChatMessage;
