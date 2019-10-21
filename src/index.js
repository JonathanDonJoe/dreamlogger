import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';


import './index.css';
import App from './App';
import firebaseConfig from './components/Firebase/Firebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA