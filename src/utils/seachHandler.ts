// src/utils/searchHandler.ts
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setSearchTerm } from '../redux/reducers/searchSlice';

export const useSearchHandler = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearchTerm(searchTerm));
        navigate(`/search/services?query=${encodeURIComponent(searchTerm)}`);
    };

    return handleSearch;
};
