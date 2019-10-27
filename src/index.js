import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';


import './index.css';
import App from './App';
import firebaseConfig from './components/Firebase/Firebase';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './reducers/rootReducer';


firebase.initializeApp(firebaseConfig);


// const store = createStore(rootReducer)
ReactDOM.render(
    // <Provider store={store}>
        <App />
    // </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA