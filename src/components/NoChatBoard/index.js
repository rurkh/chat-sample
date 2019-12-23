import React from 'react';
import './NoChatBoard.css';

export default function NoChatBoard({ nickname, avatar }) {
  return (
    <div className="viewWelcomeBoard">
        <span className="textTitleWelcome">{`Welcome, ${
          nickname
          }`}</span>
      <img
        className="avatarWelcome"
        src={avatar}
        alt="icon avatar"
      />
      <span className="textDesciptionWelcome">
          Let's start talking. Great things might happen.
        </span>
    </div>
  )
}
