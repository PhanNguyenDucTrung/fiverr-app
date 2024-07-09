import { combineReducers } from 'redux';
import productReducer from './reducers/productSlice';
import authReducer from './reducers/authSlice';
import binhLuanReducer from './reducers/binhLuanSlice';
import chiTietLoaiCongViecReducer from './reducers/chiTietLoaiCongViecSlice';
import congViecReducer from './reducers/congViecSlice';
import loaiCongViecReducer from './reducers/loaiCongViecSlice';
import nguoiDungReducer from './reducers/nguoiDungSlice';
import skillReducer from './reducers/skillSlice';
import thueCongViec from './reducers/thueCongViecSlice';

const rootReducer = combineReducers({
    productReducer,
    authReducer,
    binhLuanReducer,
    chiTietLoaiCongViecReducer,
    congViecReducer,
    loaiCongViecReducer,
    nguoiDungReducer,
    skillReducer,
    thueCongViec,
});

export default rootReducer;
