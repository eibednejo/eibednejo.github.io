import React, { useState } from 'react';
import { supabase } from '../supabase/client';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess('Signup successful! Please check your email for confirmation.');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="fancy-container">
            <h2>Sign Up</h2>
            <form className="fancy-form" onSubmit={handleSignup}>
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="fancy-message error">{error}</p>}
            {success && <p className="fancy-message success">{success}</p>}
        </div>
    );
};

export default SignupPage;