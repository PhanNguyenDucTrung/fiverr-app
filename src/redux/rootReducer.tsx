import { combineReducers } from 'redux';
import productReducer from './reducers/productSlice';
import authReducer from './reducers/authSlice';
import congViecReducer from './reducers/congViecSlice';
import servicesReducer from './reducers/servicesSlice';
import usersReducer from './reducers/usersSlice';
import ordersReducer from './reducers/ordersSlice';
import categoriesReducer from './reducers/categoriesSlice';
import searchReducer from './reducers/searchSlice';

const rootReducer = combineReducers({
    productReducer,
    authReducer,
    congViecReducer,
    servicesReducer,
    usersReducer,
    ordersReducer,
    categoriesReducer,
    searchReducer,
});

export default rootReducer;
