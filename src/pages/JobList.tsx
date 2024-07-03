import Filter from '../components/Filter';
import { useAppSelector } from '../redux/hooks';
import { useLocation } from 'react-router-dom';

//  type for congViec
type CongViec = {
    id: number;
    congViec: {
        id: number;
        tenCongViec: string;
        danhGia: number;
        giaTien: number;
        nguoiTao: number;
        hinhAnh: string;
        moTa: string;
        maChiTietLoaiCongViec: number;
        moTaNgan: string;
        saoCongViec: number;
    };
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
};

const JobList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search');
    const congViecs = useAppSelector(state => state.congViecReducer.congViecs);
    console.log(congViecs);
    // const dispatch = useAppDispatch();

    return (
        <div>
            <div className='job-list-wrapper'>
                <div className='max-width-container'>
                    <h1>Job List</h1>
                    {/* RESULT FOR HEADING */}
                    {searchTerm && (
                        <div>
                            <h2>
                                Results for <strong>"{searchTerm}"</strong>
                            </h2>
                        </div>
                    )}

                    {congViecs && <p>{congViecs.length} services available</p>}
                    {/* list of job */}

                    <Filter />

                    <div className='job-list'>
                        <div className='listing-container grid-view'>
                            {congViecs &&
                                congViecs.map((congViec: CongViec, index) => (
                                    <div key={index} className='job-item'>
                                        <div className='job-item__image'>
                                            <img src={congViec.congViec.hinhAnh} alt={congViec.congViec.tenCongViec} />
                                        </div>
                                        <div className='job-item__body'>
                                            <div className='seller-info'>
                                                <img src={congViec.avatar} alt={congViec.tenNguoiTao} />
                                                <p>{congViec.tenNguoiTao}</p>
                                            </div>
                                            <div className='job-item__content'>
                                                <h3>{congViec.congViec.tenCongViec}</h3>
                                                <p>
                                                    ⭐ {congViec.congViec.saoCongViec}
                                                    <span>({congViec.congViec.nguoiTao})</span>
                                                </p>
                                                <p>
                                                    Starting at US<strong>${congViec.congViec.giaTien}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default JobList;
