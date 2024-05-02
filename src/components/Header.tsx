import { NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/blog'>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/register'>Register</NavLink>
                    </li>
                    <li>
                        <NavLink to='/job-category'>Job Category</NavLink>
                    </li>
                    <li>
                        <NavLink to='/job-detail'>Job Detail</NavLink>
                    </li>
                    <li>
                        <NavLink to='/job-list'>Job List</NavLink>
                    </li>
                    <li>
                        <NavLink to='/admin'>Admin</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default Header;
