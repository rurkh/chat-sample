import React from 'react';
import ReactLoading from 'react-loading';
import './Login.css';

export default function Login({ onLoginPress, isLoading }) {
  return (
    <div className="viewRoot">
      <div className="header">CHAT DEMO</div>
      <button className="btnLogin" type="submit" onClick={onLoginPress}>
        SIGN IN WITH GOOGLE
      </button>

      {isLoading ? (
        <div className="viewLoading">
          <ReactLoading
            type={'spin'}
            color={'#203152'}
            height={'3%'}
            width={'3%'}
          />
        </div>
      ) : null}
    </div>
  );
};
