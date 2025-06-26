import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

const UserProfilePage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const user = supabase.auth.user();
            if (!user) {
                setError('No user found');
            } else {
                setUser(user);
                setName(user.user_metadata?.name || '');
                setEmail(user.email || '');
            }
            setLoading(false);
        };

        fetchUser();
    }, []);
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.update({ data: { name } });
        if (error) {
            setError(error.message);
        } else {
            alert('Profile updated successfully!');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="fancy-container">
            <h1>User Profile</h1>
            <form className="fancy-form" onSubmit={handleUpdateProfile}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfilePage;