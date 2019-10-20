import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import AllDreams from './components/AllDreams/AllDreams.js';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path='/home' component={Home} />
                <Route path='/entry' component={CreateEntry} />
                <Route path='/dreams' component={AllDreams} />
            </div>

        </Router>
    );
}

export default App;
