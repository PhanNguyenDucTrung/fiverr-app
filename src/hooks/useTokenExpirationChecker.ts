import { useEffect } from 'react';
import { clearToken } from '../redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const useTokenExpirationChecker = () => {
    const dispatch = useAppDispatch();
    const expiresAt = useAppSelector(state => state.authReducer.expiresAt);

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (expiresAt && Date.now() >= expiresAt) {
                dispatch(clearToken());
            }
        };

        checkTokenExpiration();

        const intervalId = setInterval(checkTokenExpiration, 1000 * 60);

        return () => clearInterval(intervalId);
    }, [dispatch, expiresAt]);
};

export default useTokenExpirationChecker;
