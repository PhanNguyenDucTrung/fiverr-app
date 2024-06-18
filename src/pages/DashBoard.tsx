import React from 'react';
import CategoryList from '../components/CategoryList';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>Category Management</h1>
            <CategoryList />
        </div>
    );
};

export default Dashboard;
