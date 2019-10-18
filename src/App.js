import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path='' component={Home} />
            </div>

        </Router>
    );
}

export default App;
