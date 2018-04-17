import React, { Component } from 'react';
import './../App.css';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
      newMessage: '',
      }]
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.getPrettyTime = this.getPrettyTime.bind(this);
 };

 componentDidMount() {
   this.messagesRef.on('child_added', snapshot => {
     const message = snapshot.val();
     message.key = snapshot.key;
     this.setState({ messages: this.state.messages.concat( message ) })
   })
 };

 handleChange(e) {
   this.setState({
     username: this.props.user,
     content: e.target.value,
     sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
     roomId: this.props.activeRoom
   });
 }

 getPrettyTime (sentAt) {
   var date = new Date(sentAt);
   var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   var month = months[date.getMonth()];
   var day = date.getDate();
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var year = date.getFullYear();
   var ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours ? hours = 12 : hours;
   minutes = minutes < 10 ? '0' + minutes : minutes;
    var prettyTime = month + ' ' + day + ' ' + year + ' at ' + hours + ':' + minutes + ampm;
    return prettyTime;

   }




newMessage(e){
  e.preventDefault();
  this.messagesRef.push({
    username: this.state.username,
    content: this.state.content,
    sentAt: this.state.sentAt,
    roomId: this.state.roomId,
  });
}

handleSubmit(e) {
  e.preventDefault();
}

 render() {
   const activeRoom = this.props.activeRoom;
   const messageList = this.state.messages
      .filter(message => message.roomId === activeRoom)
      .map(message =>
        <div className="current-message" key={message.key}>
          <p className="username">{message.username}</p>
          <p className="message-content">{message.content}</p>
          <p className="message-time">{this.getPrettyTime(message.sentAt)}</p>
        </div>
      )

   return (
     <div className="messages">
        <div className="message-list">
          <ul>
            {messageList}
          </ul>
        </div>
       <div className="chat-messages">
        <form className="new-message" onSubmit={this.handleSubmit}>
          <input type="text"
            name="new-message"
            placeholder="Type a new message"
            value={this.state.content}
            onChange={this.handleChange}/>
          <button type="submit" id="send-button" onClick={this.newMessage}>Send</button>
        </form>
       </div>
     </div>

   )
  }
 }

export default MessageList;
