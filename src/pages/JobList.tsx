import { useAppSelector } from '../redux/hooks';

const JobList = () => {
    const congViecs = useAppSelector(state => state.congViecReducer.congViecs);
    console.log(congViecs);
    // const dispatch = useAppDispatch();

    return <div>JobList</div>;
};
export default JobList;
