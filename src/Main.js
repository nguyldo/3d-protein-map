import React from 'react';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Load from './load';

export default class Main extends React.Component {
    render() {
        return(
            <Router>
                <Route path="/" exact component={Load} />
                <Route path="/map" exact component={App} />
            </Router>
        )
    }
}
