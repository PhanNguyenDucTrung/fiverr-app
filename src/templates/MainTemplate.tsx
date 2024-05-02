// MainTemplate.tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainTemplate = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
export default MainTemplate;
