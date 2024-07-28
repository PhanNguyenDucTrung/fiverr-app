import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearToken } from './redux/reducers/authSlice';

import MainTemplate from './templates/MainTemplate';
import AdminTemplate from './templates/AdminTemplate';
import ChatTemplate from './pages/ChatTemplate';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/scss/main.scss';

const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const JobCategory = lazy(() => import('./pages/JobCategory'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const JobList = lazy(() => import('./pages/JobList'));
const PasswordReset = lazy(() => import('./components/PasswordReset'));
const EmailVerification = lazy(() => import('./components/EmailVerification'));
const Users = lazy(() => import('./pages/Users'));
const Services = lazy(() => import('./pages/Services'));
const Orders = lazy(() => import('./pages/Orders'));
const Categories = lazy(() => import('./pages/Categories'));
const SubcategoryDetails = lazy(() => import('./pages/SubcategoryDetails'));
const ChildCategoryDetails = lazy(() => import('./pages/ChildCategoryDetails'));
const LoginForm = lazy(() => import('./pages/LoginForm'));
const SignUpForm = lazy(() => import('./pages/SignUpForm'));
const ServiceUpload = lazy(() => import('./pages/ServiceUpload'));

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

    const handleLoginSuccess = () => {
        console.log('Login successful!');
    };

    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' />} />
            <Route
                path='/login'
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                    </Suspense>
                }
            />
            <Route path='/' element={<MainTemplate />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path='/home'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Profile />
                        </Suspense>
                    }
                />
                <Route
                    path='/search/services'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <JobList />
                        </Suspense>
                    }
                />
                <Route
                    path='/services/:serviceId'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <JobDetail />
                        </Suspense>
                    }
                />
                <Route
                    path='/job-detail'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <JobDetail />
                        </Suspense>
                    }
                />
                <Route
                    path='/categories/:categoryName'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <JobCategory />
                        </Suspense>
                    }
                />
                <Route
                    path='/categories/:tenLoaiCongViec/:tenNhom/:tenChiTiet/:id'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <JobList />
                        </Suspense>
                    }
                />
                <Route
                    path='/verify-email/:token'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <EmailVerification />
                        </Suspense>
                    }
                />
                <Route
                    path='/reset-password/:token'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <PasswordReset />
                        </Suspense>
                    }
                />
            </Route>
            <Route path='/admin' element={<AdminTemplate />}>
                <Route
                    path='users'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Users />
                        </Suspense>
                    }
                />
                <Route
                    path='jobs'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Services />
                        </Suspense>
                    }
                />
                <Route
                    path='orders'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Orders />
                        </Suspense>
                    }
                />
                <Route
                    path='categories'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Categories />
                        </Suspense>
                    }
                />
                <Route
                    path='/admin/categories/:id/edit'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <SubcategoryDetails />
                        </Suspense>
                    }
                />
                <Route
                    path='/admin/subcategories/:id/child-categories'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <ChildCategoryDetails />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path='/signup'
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <SignUpForm />
                    </Suspense>
                }
            />
            <Route
                path='/register'
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <SignUpForm />
                    </Suspense>
                }
            />
            <Route
                path='/services/new'
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ServiceUpload />
                    </Suspense>
                }
            />
            <Route
                path='/services/edit/:serviceId'
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ServiceUpload />
                    </Suspense>
                }
            />
            <Route
                path='/chat'
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ChatTemplate />
                    </Suspense>
                }
            />
        </Routes>
    );
}

export default App;
