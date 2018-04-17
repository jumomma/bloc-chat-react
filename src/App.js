import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyA9MF7eeImHnXQylfpVASS32_JfgCLludk",
  authDomain: "bloc-chat-a97ce.firebaseapp.com",
  databaseURL: "https://bloc-chat-a97ce.firebaseio.com",
  projectId: "bloc-chat-a97ce",
  storageBucket: "bloc-chat-a97ce.appspot.com",
  messagingSenderId: "744733192977"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeRoom: '',
      user:'',
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
    console.log(room);
  }

  setUser(username) {
    this.setState({ user: username })
  }


  render() {
    const displayMessages = this.state.activeRoom;
    const activeUser = this.state.user === null ? 'Guest' : this.state.user.displayName;

    return (
      <div className="App">
        <div className="user-signon">
          <User firebase={firebase} setUser={this.setUser} activeUser={activeUser} />
        </div>
        <aside>
          <div id="side-bar">
            <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
          </div>
        </aside>
        <div className="message-list">
          {displayMessages ?
          (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={this.state.user.displayName}/>)
          : (null)
          }
        </div>
      </div>

    );
  }
}

export default App;
