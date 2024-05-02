import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainTemplate from './templates/MainTemplate';
import Blog from './components/Blog';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import JobCategory from './pages/JobCategory';
import JobDetail from './pages/JobDetail';
import JobList from './pages/JobList';
import Admin from './pages/Admin';
function App() {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='/' element={<MainTemplate />}>
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/job-category' element={<JobCategory />} />
                    <Route path='/job-detail' element={<JobDetail />} />
                    <Route path='/job-list' element={<JobList />} />
                    <Route path='/admin' element={<Admin />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
