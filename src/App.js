import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../Library/Caches/typescript/3.6/node_modules/redux';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import AllDreams from './components/AllDreams/AllDreams';
import SingleDream from './components/SingleDream/SingleDream';
import SideNav from './components/SideNav/SideNav';
import LogIn from './components/LogIn/LogIn';
import loginAction from './actions/loginAction';
import setDreamAction from './actions/setDreamAction';
import Statistics from './components/Statistics/Statistics';

class App extends Component {
    state = {
        text: '20',
        isSignedIn: false
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
        firebase.auth().onAuthStateChanged( user => {
            console.log(user)
            this.setState({
                isSignedIn: !!user,
                uid: user.uid
            }, () => {
                this.props.login({
                    isSignedIn:this.state.isSignedIn,
                    uid: this.state.uid
                })
                // console.log('mount')
                if(this.state.isSignedIn){
                    this.getDreams()
                }
            })
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
            const dreamArr = []
            let dreamItem = {}
            for (let key in snap.val()) {
                // console.log(key)
                dreamItem = snap.val()[key]
                dreamItem['dreamKey'] = key
                // console.log(dreamItem)
                dreamArr.push(dreamItem)
            }
            // this.setState({
            //     dreams: dreamArr
            // })
            this.props.setDream(dreamArr)
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
        return (
            <Router>
                <div className="App">
                    <Route path='/' component={SideNav} />
                    <Route path='/login' component={LogIn} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/entry' component={this.state.isSignedIn?CreateEntry:LogIn} />
                    <Route exact path='/dreams' component={this.state.isSignedIn?AllDreams:LogIn} />
                    <Route path='/dreams/:dreamId' component={this.state.isSignedIn?SingleDream:LogIn} />
                    <Route path='/stats' component={this.state.isSignedIn?Statistics:LogIn} />
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
        setDream: setDreamAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);