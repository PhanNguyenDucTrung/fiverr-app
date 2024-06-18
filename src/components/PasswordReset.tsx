import React, { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/api/users/reset-password/${token}`, {
                password,
            });
            alert(response.data.message);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message || 'An error occurred');
            } else {
                alert('An error occurred');
            }
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password</label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirm New Password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordReset;
