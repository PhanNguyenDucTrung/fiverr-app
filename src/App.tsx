import { Routes, Route, Navigate } from 'react-router-dom';
import './assets/scss/main.scss';
import MainTemplate from './templates/MainTemplate';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import JobCategory from './pages/JobCategory';
import JobDetail from './pages/JobDetail';
import JobList from './pages/JobList';
import Admin from './pages/Admin';
import PasswordReset from './components/PasswordReset';
import EmailVerification from './components/EmailVerification';
import Dashboard from './pages/DashBoard';

function App() {
    return (
        <Routes>
            <Route path='' element={<Home />} />
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/' element={<MainTemplate />}>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/job-category' element={<JobCategory />} />
                <Route path='/job-detail' element={<JobDetail />} />
                <Route path='/result' element={<JobList />} />
                <Route path='/categories/:tenLoaiCongViec' element={<JobCategory />} />
                <Route path='/categories/:tenLoaiCongViec/:tenNhom/:tenChiTiet/:id' element={<JobList />} />
                <Route path='/admin' element={<Admin />} />

                <Route path='/verify-email/:token' element={<EmailVerification />} />
                <Route path='/reset-password/:token' element={<PasswordReset />} />
            </Route>
            <Route path='/dash-board' element={<Dashboard />}></Route>
        </Routes>
    );
}

export default App;
