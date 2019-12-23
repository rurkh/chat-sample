import React, {useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import images from '../../themes/images';
import isLastMessageLeft from '../../utils/isLastMessageLeft';
import { fireDB } from '../../services/FirebaseService';
import AppString from '../../constants/firebase';
import { saveMessages, sendMessage } from '../../actions/chat.actions';
import './ChatBoard.css';

function ChatBoard({ currentPeerUser, messageList, currentUserId, sendMessage, roomId, saveMessages }) {
  const [ inputValue, inputValueChange ] = useState('');
  const unsubMessages = useRef({});
  useEffect(() => {
    unsubMessages.current = fireDB.collection(AppString.NODE_MESSAGES)
      .orderBy('timestamp')
      .where('roomId', '==', roomId)
      .onSnapshot(function(snap) {
        const messages = [];
        snap.forEach(doc => {
          messages.push(doc.data());
        });
        saveMessages(messages);
      });
  }, [roomId]);

  useEffect(() => () => {
    unsubMessages.current();
  }, []);

  const renderListMessage = () => {
    if (messageList.length > 0) {
      let viewListMessage = [];
      messageList.forEach((item, index) => {
        if (item.from === currentUserId) {
            viewListMessage.push(
              <div className="viewItemRight" key={item.timestamp}>
                <span className="textContentItem">{item.content}</span>
              </div>
            )

        } else {
            viewListMessage.push(
              <div className="viewWrapItemLeft" key={item.timestamp}>
                <div className="viewWrapItemLeft3">
                  {isLastMessageLeft(index, messageList, currentUserId) ? (
                    <img
                      src={currentPeerUser.photoUrl}
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                  ) : (
                    <div className="viewPaddingLeft"/>
                  )}
                  <div className="viewItemLeft">
                    <span className="textContentItem">{item.content}</span>
                  </div>
                </div>
                {isLastMessageLeft(index, messageList, currentUserId) ? (
                  <span className="textTimeLeft">
                    {moment(Number(item.timestamp)).format('ll')}
                  </span>
                ) : null}
              </div>
            )
        }
      });
      return viewListMessage
    } else {
      return (
        <div className="viewWrapSayHi">
          <span className="textSayHi">Say hi to new friend</span>
          <img
            className="imgWaveHand"
            src={images.ic_wave_hand}
            alt="wave hand"
          />
        </div>
      )
    }
  };
  const onSendMessage = () => {
    if (inputValue.trim() === '') {
      return
    }

    const timestamp = moment()
      .valueOf()
      .toString();

    const itemMessage = {
      from: currentUserId,
      to: currentPeerUser.id,
      timestamp: timestamp,
      content: inputValue.trim(),
    };
    inputValueChange('');

    sendMessage(itemMessage);

  };

  const inputChange = (event) => {
    inputValueChange(event.target.value);
  };

  const onKeyboardPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="viewChatBoard">
      <div className="headerChatBoard">
        <img
          className="viewAvatarItem"
          src={currentPeerUser.photoUrl}
          alt="icon avatar"
        />
        <span className="textHeaderChatBoard">
            {currentPeerUser.nickname}
          </span>
      </div>

      <div className="viewListContentChat">
        {renderListMessage()}
        <div
          style={{float: 'left', clear: 'both'}}

        />
      </div>

      <div className="viewBottom">

        <input
          className="viewInput"
          placeholder="Type your message..."
          value={inputValue}
          onChange={inputChange}
          onKeyPress={onKeyboardPress}
        />
        <img
          className="icSend"
          alt="icon send"
          src={images.ic_send}
          onClick={onSendMessage}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentPeerUser: state.userList.find((item => item.id === state.peer.peerUser)),
  currentUserId: state.user.id,
  roomId: state.peer.chatRoomId,
  messageList: state.peer.messages,
});

export default connect(mapStateToProps, {
  saveMessages,
  sendMessage,
})(ChatBoard);
