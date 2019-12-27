import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../Library/Caches/typescript/3.6/node_modules/redux';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import MyDreams from './components/MyDreams/MyDreams';
import SingleDream from './components/SingleDream/SingleDream';
import SideNav from './components/SideNav/SideNav';
import LogIn from './components/LogIn/LogIn';
import loginAction from './actions/loginAction';
import setDreamAction from './actions/setDreamAction';
import setAllDreamsAction from './actions/setAllDreamsAction';
import Statistics from './components/Statistics/Statistics';
import PublicDreams from './components/PublicDreams/PublicDreams';

class App extends Component {
    state = {
        text: '20',
        isSignedIn: false,
        uid: '',
        email: '',
        userAvatar: '',
        displayName: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth !== this.props.auth) {
            // console.log(this.props.auth.isSignedIn)
            if (this.props.auth.isSignedIn) {
                // console.log('am signed in')
                this.getDreams()
            }
        }
    }

    componentDidMount() {
        this.getAllDreams()
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            if (user) {

                this.setState({
                    isSignedIn: !!user,
                    uid: user.uid,
                    email: user.email,
                    userAvatar: user.photoURL,
                    displayName: user.displayName
                }, () => {
                    this.props.login({
                        isSignedIn: this.state.isSignedIn,
                        uid: this.state.uid,
                        email: this.state.email,
                        userAvatar: this.state.userAvatar,
                        displayName: this.state.displayName
                    })
                    // console.log('mount')
                    if (this.state.isSignedIn) {
                        this.getDreams()
                    }
                })
            }
        })
        // this.getDreams()
        //     const rootRef = firebase.database().ref().child('Hi');
        //     rootRef.on('value', snap => {
        //         // console.log(snap.val())
        //         this.setState({
        //             text: snap.val()
        //         })
        //     })
        //     this.writeUserData('joe')

    }

    getDreams() {
        const rootRef = firebase.database().ref().child(`users/${firebase.auth().currentUser.uid}`);
        rootRef.on('value', snap => {
            // console.log(snap.val())
            const dreamArr = [];
            let dreamItem = {};
            for (let key in snap.val()) {
                // console.log(key)
                dreamItem = snap.val()[key];
                dreamItem['dreamKey'] = key;
                dreamItem['dreamUserID'] = firebase.auth().currentUser.uid;
                // console.log(dreamItem)
                dreamArr.push(dreamItem);
            }
            // this.setState({
            //     dreams: dreamArr
            // })
            this.props.setDream(dreamArr);
        })
    }
    getAllDreams() {
        const rootRef = firebase.database().ref().child(`users/`);
        rootRef.on('value', snap => {
            const allDreamsArr = [];
            const allData = snap.val();
            // console.log(allData)
            Object.keys(allData).forEach(user => {
                // console.log(user)
                const thisUserData = allData[user];
                // console.log(Object.keys(thisUserData))
                Object.keys(thisUserData).forEach( dreamID => {
                    let newDreamObj = {};
                    for (let key in thisUserData[dreamID]) {
                        newDreamObj[key] = thisUserData[dreamID][key];
                    }
                    newDreamObj['dreamKey'] = dreamID;
                    newDreamObj['dreamUserID'] = user;
                    // console.log(newDreamObj)
                    allDreamsArr.push(
                        {
                            userID: user,
                            dream: newDreamObj
                        })
                })
            })
            // console.log(allDreamsArr)
            this.props.setAllDreams(allDreamsArr);
        })
    }

    writeUserData(name) {
        firebase.database().ref('users/').set({
            username: name
        });
    }

    render() {
        // console.log(this.state.isSignedIn)
        // console.log(this.props)
        // this.getAllDreams();
        return (
            <Router>
                <div className="App">
                    <Route path='/' component={SideNav} />
                    <Route path='/login' component={LogIn} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/entry' component={this.state.isSignedIn ? CreateEntry : LogIn} />
                    <Route exact path='/dreams' component={this.state.isSignedIn ? MyDreams : LogIn} />
                    <Route exact path='/allDreams' component={PublicDreams} />
                    <Route path='/dreams/:dreamId' component={this.state.isSignedIn ? SingleDream : LogIn} />
                    <Route path='/stats' component={this.state.isSignedIn ? Statistics : LogIn} />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth,
        myDreams: state.myDreams
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: loginAction,
        setDream: setDreamAction,
        setAllDreams: setAllDreamsAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);