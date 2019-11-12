import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase';

class LogIn extends Component {
    state = {  }

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        // signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };

    render() { 
        let loginItems = this.props.auth.isSignedIn ? 
            (<span>
                {/* <h1>signedIn</h1>  */}
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <img id='profile-pic' alt='profile pic' src={firebase.auth().currentUser.photoURL}></img>
                <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
                </span>
                ):
            <StyledFirebaseAuth 
            uiConfig={this.uiConfig} 
            firebaseAuth={firebase.auth()}
            />
        console.log(loginItems)
        return (
            loginItems
        );
    }
}

function mapStateToProps(state) {
    return({
        auth: state.auth
    })
}
 
export default connect(mapStateToProps, null)(LogIn);