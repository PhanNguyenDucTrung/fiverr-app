import { combineReducers } from 'redux';
import productReducer from './reducers/productSlice';
import authReducer from './reducers/authSlice';
import chiTietLoaiCongViecReducer from './reducers/chiTietLoaiCongViecSlice';
import congViecReducer from './reducers/congViecSlice';
import loaiCongViecReducer from './reducers/loaiCongViecSlice';
import servicesReducer from './reducers/servicesSlice';
import usersReducer from './reducers/usersSlice';
import ordersReducer from './reducers/ordersSlice';
import categoriesReducer from './reducers/categoriesSlice';

const rootReducer = combineReducers({
    productReducer,
    authReducer,
    chiTietLoaiCongViecReducer,
    congViecReducer,
    loaiCongViecReducer,
    servicesReducer,
    usersReducer,
    ordersReducer,
    categoriesReducer,
});

export default rootReducer;
