import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import NoChatBoard from '../../components/NoChatBoard';
import images from '../../themes/images';
import { fireDB, realtimeDB } from '../../services/FirebaseService';
import AppString from '../../constants/firebase';
import { logout, saveUsers, selectPeerUser } from '../../actions/auth.actions';
import ChatBoard from '../../components/ChatBoard';
import './Main.css';

function Main({ logout, user, usersList, currentPeerUser, saveUsers, selectPeerUser }) {
  const selectUser = (id) => () => {
    selectPeerUser(id);
  };

  const onLogoutPress = () => {
    logout();
  };

  const renderListUser = () => usersList.map(item => (
    <button
      key={item.id}
      className={
        currentPeerUser === item.id
          ? 'viewWrapItemFocused'
          : 'viewWrapItem'
      }
      onClick={selectUser(item.id)}
    >
      <img
        className="viewAvatarItem"
        src={item.photoUrl}
        alt="icon avatar"
      />
      <div className="viewWrapContentItem">
              <span className="textItem">{`Nickname: ${
                item.nickname
                }`}</span>
        <span className="textItem">{`Status: ${
          item.status
          }`}</span>
      </div>
    </button>
  ));

  useEffect(() =>{
   const subscribeUsers =  fireDB.collection(AppString.NODE_USERS).onSnapshot(function(snap) {
      const users = [];
      snap.forEach( doc => {
        const docUser = doc.data();
        if (docUser.id !== user.id) {
          users.push(doc.data());
        }
      });
      saveUsers(users);
    });

    const subScribeConnections = realtimeDB.ref('.info/connected').on('value', (s) => {
      const userId = user.id;
      if (s) {
        fireDB.collection(AppString.NODE_USERS)
          .doc(userId)
          .update({
            status: 'online',
          });

        realtimeDB.ref(`/users/${userId}`).set('online');
        fireDB.collection(AppString.NODE_USERS).doc(userId).update({
          status: 'online',
        });
      }

    });

    realtimeDB.ref(`users/${user.id}`).onDisconnect().set('offline').then(() => {
      const userId = user.id;
      fireDB.collection(AppString.NODE_USERS).doc(userId).update({
        status: 'online'
      });
      realtimeDB.ref(`/users/${user.id}`).set('online');
    });
    return () => {
      subscribeUsers();
      subScribeConnections();
    }
  }, []);

  return (
    <div className="root">
      {/* Header */}
      <div className="header">
        <span>MAIN</span>
        <img
          className="icLogout"
          alt="An icon logout"
          src={images.ic_logout}
          onClick={onLogoutPress}
        />
      </div>

      {/* Body */}
      <div className="body">
        <div className="viewListUser"> {renderListUser()}</div>
        <div className="viewBoard">
          {currentPeerUser ? (
            <ChatBoard />
          ) : (
            <NoChatBoard
              nickname={user.nickname}
              avatar={user.photoUrl}
              messageList={[]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
  user: state.user,
  usersList: state.userList,
  currentPeerUser: state.peer.peerUser,
});

export default connect(mapStateToProps, {
  saveUsers,
  selectPeerUser,
  logout,
})(Main);
