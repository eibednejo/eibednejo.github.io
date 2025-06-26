import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'; // Changed to HashRouter
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import UserProfilePage from './components/UserProfilePage';
import SubscriptionPage from './components/SubscriptionPage';
import ChatPage from './components/ChatPage';

// Simple auth check (replace with real logic as needed)
const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

// PrivateRoute component
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

const DebugRoute = () => {
    const location = useLocation();
    return <div style={{position: 'fixed', top: 0, left: 0, background: '#ffc', zIndex: 9999}}>Current route: {location.pathname}</div>;
};

const App = () => {
    return (
        <Router>
            {/* <DebugRoute /> */}
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <PrivateRoute path="/" exact component={ChatPage} />
                <PrivateRoute path="/admin" component={AdminPage} />
                <PrivateRoute path="/profile" component={UserProfilePage} />
                <PrivateRoute path="/subscriptions" component={SubscriptionPage} />
                {/* Catch-all: redirect to login */}
                <Route render={() => <Redirect to="/login" />} />
            </Switch>
        </Router>
    );
};

export default App;