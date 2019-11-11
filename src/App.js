import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../Library/Caches/typescript/3.6/node_modules/redux';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import AllDreams from './components/AllDreams/AllDreams.js';
import SingleDream from './components/SingleDream/SingleDream';
import SideNav from './components/SideNav/SideNav';
import loginAction from './actions/loginAction';

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
            }, () => {
                this.props.login({
                    isSignedIn:this.state.isSignedIn
                })
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
        console.log(this.props.auth)
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
                    <Route path='/' component={SideNav} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/entry' component={this.state.isSignedIn?CreateEntry:Home} />
                    <Route exact path='/dreams' component={this.state.isSignedIn?AllDreams:Home} />
                    <Route path='/dream/:dreamId' component={this.state.isSignedIn?SingleDream:Home} />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: loginAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);