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
    this.handleClick = this.handleClick.bind(this);
    this.createRoom = this.createRoom.bind(this);
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


  createRoom(e) {
      this.roomsRef.push({
        name: this.state.newRoomName
      });
    }

  handleClick(e){
    e.preventDefault();
    e.target.reset();
    if (!this.state.newRoomName) {return}
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
          </ul>

          <p id="create">Create a new chat room:</p>
          <form onSubmit= {this.handleClick}>
            <input type="text" placeholder="Type room name"
            onChange={(e) => this.handleChange(e)}/>
          <button className="button" id="create-room-button"
            onClick={() => this.createRoom()}>
            Create Room
          </button>
          </form>
      </div>
      )}


  }


export default RoomList;
