import React, { Component } from 'react';
import './../App.css';


class User extends Component {
  constructor(props) {
    super(props);

    this.signIn= this.signIn.bind(this);
    this.signOut= this.signOut.bind(this);
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    //this.props.setUser(this.props.currentUser);//.then((result) => {
        //const user = result.user;
        //this.props.setUser(user);
      console.log("user signed in");
  }

  signOut() {
    this.props.firebase.auth().signOut();
    this.props.setUser(null);
    }

  render() {
    return(
      <div className="signin">
        <h3>Howdy, {this.props.activeUser}!</h3>
        {this.props.activeUser === 'Guest' ?
          <button onClick={this.signIn}>Sign In</button>
          :
          <button onClick={this.signOut}>Sign Out</button>}
      </div>
    )}

 };

 export default User;
