import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
        </div>
    </Router>
)

ReactDOM.render(
   routing,
    document.getElementById('app')
);