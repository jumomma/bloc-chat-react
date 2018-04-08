import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


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
      activeRoom: ''
    };
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
    console.log(room);
  }


  render() {
    const displayMessages = this.state.activeRoom;

    return (
      <div className="App">
        <aside>
          <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
        </aside>
        <div className="message-list">
          {displayMessages ?
          (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
          : (null)
          }
        </div>
      </div>

    );
  }
}

export default App;
