import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import UserProfilePage from './components/UserProfilePage';
import SubscriptionPage from './components/SubscriptionPage';
import ChatPage from './components/ChatPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ChatPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/profile" component={UserProfilePage} />
                <Route path="/subscriptions" component={SubscriptionPage} />
            </Switch>
        </Router>
    );
};

export default App;