import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/login/login'
import Login from './components/login/login';
import App from './components/application/App';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory  from 'history/createBrowserHistory';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const history = createBrowserHistory();

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router history={history}>
            <Switch>
                <Route exact={true} path='/' component={App}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </Router>
    </MuiThemeProvider>,

    document.getElementById('root')
);