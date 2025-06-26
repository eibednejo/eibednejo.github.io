import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            if (user && user.id) {
                localStorage.setItem('authToken', user.id);
            }
            history.push('/');
        }
    };

    return (
        <div className="fancy-container">
            <h2>Login</h2>
            <form className="fancy-form" onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="fancy-message error">{error}</p>}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button type="submit">Log In</button>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                        style={{ background: '#fff', color: '#f76b1c', border: '1.5px solid #f76b1c' }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;