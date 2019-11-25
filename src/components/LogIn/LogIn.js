import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase';

import logOutAction from '../../actions/logOutAction';

class LogIn extends Component {
    state = {  }

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/dreams',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    signOut = () => {
        this.props.logOut({
            isSignedIn: false
        })
        firebase.auth().signOut();
    }

    render() { 
        // console.log(this.props)
        let loginItems = this.props.auth.isSignedIn ? 
            (<span>
                {/* <h1>signedIn</h1>  */}
                <h1>Logged in as {firebase.auth().currentUser.displayName}</h1>
                {/* <img id='profile-pic' alt='profile pic' src={firebase.auth().currentUser.photoURL}></img> */}
                <br/>
                <button onClick={this.signOut} className='btn red lighten-1'>Sign Out</button>
                </span>
                ):
            <StyledFirebaseAuth 
            uiConfig={this.uiConfig} 
            firebaseAuth={firebase.auth()}
            />
        // console.log(loginItems)
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // login: loginAction,
        logOut: logOutAction
    }, dispatch)
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);