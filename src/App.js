import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import AllDreams from './components/AllDreams/AllDreams.js';

class App extends Component {
    state = {
        text:'0'
    }

    componentDidMount() {

    const rootRef = firebase.database().ref().child('Hi');
    rootRef.on('value', snap => {
        console.log(snap)
        this.setState({
            text: snap.val()
        })
    })
}

    render() {
        return (
            <Router>
                <div className="App">
                    <h1>{this.state.text}</h1>
                    <Route path='/home' component={Home} />
                    <Route path='/entry' component={CreateEntry} />
                    <Route path='/dreams' component={AllDreams} />
                </div>
            </Router>
        );
    }
}

export default App;