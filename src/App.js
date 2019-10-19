import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path='/' component={Home} />
                <Route path='/Entry' component={CreateEntry} />
            </div>

        </Router>
    );
}

export default App;
