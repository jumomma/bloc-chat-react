import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
      username: '',
      content: '',
      sentAt: '',
      roomID: '',}]
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
 };

 componentDidMount() {
   this.messagesRef.on('child_added', snapshot => {
     const message = snapshot.val();
     message.key = snapshot.key;
     this.setState({ messages: this.state.messages.concat( message ) })
   })
 };



 render() {
   const activeRoom = this.props.activeRoom;
   const messageList = this.state.messages
      .filter(message => message.roomId === activeRoom)
      .map(message => {
        return <li className="current-message" key={message.key}>{message.content} {message.sentAt} {message.username}</li>
      })

   return (
     <div className="messages">
      <ul>
        {messageList}
      </ul>
     </div>
   )
  }
 }

export default MessageList;
