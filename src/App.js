import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import AllDreams from './components/AllDreams/AllDreams.js';

class App extends Component {
    state = {
        text: '20',
        isSignedIn: false
    }

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

    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            console.log(user)
            this.setState({
                isSignedIn: !!user
            })
        })
    //     const rootRef = firebase.database().ref().child('Hi');
    //     rootRef.on('value', snap => {
    //         // console.log(snap.val())
    //         this.setState({
    //             text: snap.val()
    //         })
    //     })
    //     this.writeUserData('joe')

    }

    writeUserData(name) {
        firebase.database().ref('users/').set({
            username: name
        });
    }

    render() {
        console.log(this.state.isSignedIn)
        return (
            <Router>
                <div className="App">
                    {this.state.isSignedIn ? 
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
                    }
                    <Route path='/home' component={Home} />
                    <Route path='/entry' component={CreateEntry} />
                    <Route path='/dreams' component={AllDreams} />
                </div>
            </Router>
        );
    }
}

export default App;