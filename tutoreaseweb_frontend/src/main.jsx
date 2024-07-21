import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import SignIn from './components/SignIn';
import ClassSession from './components/ClassSession';
import './index.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/classsession" component={ClassSession} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
