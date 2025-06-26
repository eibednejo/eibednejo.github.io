import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import UserProfilePage from './components/UserProfilePage';
import SubscriptionPage from './components/SubscriptionPage';
import ChatPage from './components/ChatPage';

// Simple auth check (replace with real logic as needed)
const isAuthenticated = () => !!localStorage.getItem('authToken');

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const App = () => (
    <Router>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <PrivateRoute path="/" exact component={ChatPage} />
            <PrivateRoute path="/admin" component={AdminPage} />
            <PrivateRoute path="/profile" component={UserProfilePage} />
            <PrivateRoute path="/subscriptions" component={SubscriptionPage} />
            <Route render={() => <Redirect to="/login" />} />
        </Switch>
    </Router>
);

export default App;