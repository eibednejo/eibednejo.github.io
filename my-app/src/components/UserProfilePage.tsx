import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                setError(error.message);
            } else {
                setUser(data.user);
                setName(data.user?.user_metadata?.name || '');
                setEmail(data.user?.email || '');
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({
            data: { name }
        });
        if (error) {
            setError(error.message);
        } else {
            alert('Profile updated successfully!');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <form onSubmit={handleUpdateProfile}>
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