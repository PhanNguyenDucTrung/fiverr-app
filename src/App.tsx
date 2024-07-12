import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearToken } from './redux/reducers/authSlice';

import MainTemplate from './templates/MainTemplate';
import AdminTemplate from './templates/AdminTemplate';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import JobCategory from './pages/JobCategory';
import JobDetail from './pages/JobDetail';
import JobList from './pages/JobList';
import PasswordReset from './components/PasswordReset';
import EmailVerification from './components/EmailVerification';

import Users from './pages/Users';
import Services from './pages/Services';
import Orders from './pages/Orders';
import Categories from './pages/Categories';
import './assets/scss/main.scss';
function App() {
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
    return (
        <Routes>
            <Route path='' element={<Home />} />
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/' element={<MainTemplate />}>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/job-category' element={<JobCategory />} />
                <Route path='/search/services' element={<JobList />} />
                <Route path='/job-detail' element={<JobDetail />} />

                <Route path='/categories/:categoryName' element={<JobCategory />} />
                <Route path='/categories/:tenLoaiCongViec/:tenNhom/:tenChiTiet/:id' element={<JobList />} />
                <Route path='/verify-email/:token' element={<EmailVerification />} />
                <Route path='/reset-password/:token' element={<PasswordReset />} />
            </Route>

            <Route path='/admin' element={<AdminTemplate />}>
                <Route path='users' element={<Users />} />
                <Route path='jobs' element={<Services />} />
                <Route path='orders' element={<Orders />} />
                <Route path='categories' element={<Categories />} />
            </Route>
        </Routes>
    );
}

export default App;
