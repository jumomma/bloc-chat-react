import React, { Component } from 'react';
import './../App.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
 };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });

    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }


  handleClick(e) {
    if (this.state.newRoomName!==''){
      this.roomsRef.push({
        name: this.state.newRoomName
      });
    }
    else {
        alert("Field cannot be blank!");
    };
  }

  selectRoom(key){
    this.props.activeRoom(key);
  }



  render() {
    return(
      <div id="side-bar">
        <div id="side-bar-title">
          <h1>Bloc Chat</h1>
        </div>
          <ul>
          {this.state.rooms.map( (room, index) => {
            return (
            <div className="room-list" key={room.key} onClick={(e) => this.selectRoom(room, e)} > {room.name}
            </div>)
          }
        )}

          <p id="create">Create a new chat room:</p>
          <form>
            <input type="text"
            onChange={(e) => this.handleChange(e)}
          />
          <button className="button" id="create-room-button"
            onClick={() => this.handleClick()}>
            Create Room
          </button>
          </form>
          </ul>
      </div>
      )}


  }


export default RoomList;
