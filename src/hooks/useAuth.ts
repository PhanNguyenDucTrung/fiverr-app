import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setToken, clearToken, fetchUserProfile } from '../redux/reducers/authSlice';

const useAuth = () => {
    const { token, profile, role, expiresAt } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const login = (token: string) => {
        dispatch(setToken(token));
        dispatch(fetchUserProfile());
    };

    const logout = () => {
        dispatch(clearToken());
    };

    const isAuthenticated = !!token && Date.now() < (expiresAt || 0);

    return { token, profile, role, isAuthenticated, login, logout };
};

export default useAuth;
