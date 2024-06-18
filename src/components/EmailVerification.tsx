import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const { token } = useParams<Params>();
    interface Params {
        token: string;
        [key: string]: string | undefined;
    }

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/verify-email/${token}`);
                alert(response.data.message);
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response) {
                    alert(error.response.data.message || 'An error occurred');
                } else {
                    alert('An error occurred');
                }
            }
        };
        verifyEmail();
    }, [token]);

    return (
        <div>
            <h1>Email Verification</h1>
        </div>
    );
};

export default EmailVerification;
