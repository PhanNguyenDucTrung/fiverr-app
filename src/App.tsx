import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useTokenExpirationChecker from './hooks/useTokenExpirationChecker';

import MainTemplate from './templates/MainTemplate';
import AdminTemplate from './templates/AdminTemplate';
import ChatTemplate from './pages/ChatTemplate';

import FullPageSpin from './components/FullPageSpin';

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
    useTokenExpirationChecker();

    const handleLoginSuccess = () => {
        console.log('Login successful!');
    };

    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' />} />
            <Route
                path='/login'
                element={
                    <Suspense fallback={<FullPageSpin />}>
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                    </Suspense>
                }
            />
            <Route path='/' element={<MainTemplate />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path='/home'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Profile />
                        </Suspense>
                    }
                />
                <Route
                    path='/search/services'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <JobList />
                        </Suspense>
                    }
                />
                <Route
                    path='/services/:serviceId'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <JobDetail />
                        </Suspense>
                    }
                />
                <Route
                    path='/job-detail'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <JobDetail />
                        </Suspense>
                    }
                />
                <Route
                    path='/categories/:categoryName'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <JobCategory />
                        </Suspense>
                    }
                />
                <Route
                    path='/categories/:tenLoaiCongViec/:tenNhom/:tenChiTiet/:id'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <JobList />
                        </Suspense>
                    }
                />
                <Route
                    path='/verify-email/:token'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <EmailVerification />
                        </Suspense>
                    }
                />
                <Route
                    path='/reset-password/:token'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <PasswordReset />
                        </Suspense>
                    }
                />
            </Route>
            <Route path='/admin' element={<AdminTemplate />}>
                <Route
                    path='users'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Users />
                        </Suspense>
                    }
                />
                <Route
                    path='jobs'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Services />
                        </Suspense>
                    }
                />
                <Route
                    path='orders'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Orders />
                        </Suspense>
                    }
                />
                <Route
                    path='categories'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <Categories />
                        </Suspense>
                    }
                />
                <Route
                    path='/admin/categories/:id/edit'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <SubcategoryDetails />
                        </Suspense>
                    }
                />
                <Route
                    path='/admin/subcategories/:id/child-categories'
                    element={
                        <Suspense fallback={<FullPageSpin />}>
                            <ChildCategoryDetails />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path='/signup'
                element={
                    <Suspense fallback={<FullPageSpin />}>
                        <SignUpForm />
                    </Suspense>
                }
            />
            <Route
                path='/register'
                element={
                    <Suspense fallback={<FullPageSpin />}>
                        <SignUpForm />
                    </Suspense>
                }
            />
            <Route
                path='/services/new'
                element={
                    <Suspense fallback={<FullPageSpin />}>
                        <ServiceUpload />
                    </Suspense>
                }
            />
            <Route
                path='/services/edit/:serviceId'
                element={
                    <Suspense fallback={<FullPageSpin />}>
                        <ServiceUpload />
                    </Suspense>
                }
            />
            <Route
                path='/chat'
                element={
                    <Suspense fallback={<FullPageSpin />}>
                        <ChatTemplate />
                    </Suspense>
                }
            />
        </Routes>
    );
}

export default App;
