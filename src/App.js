import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
        <RoomList
        firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
