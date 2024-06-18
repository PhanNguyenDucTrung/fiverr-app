import { useAppSelector } from '../redux/hooks';
import Footer from '../components/Footer';
// import { fetchCongViecTheoChiTietLoai } from '../redux/reducers/congViecSlice';

const tags = [
    'Programming & Tech',
    'Fivem Script',
    'Convert Website to App',
    'Custom App',
    'Discord Server',
    'Python Developer',
    'PHP Programmer',
    'Unity Developer',
    'Discord Chatbot',
    'Twitch Trivia Bot',
    'Shopify Expert',
    'Wix website builder',
    'Squarespace Programmer',
    'Roblox Scripter',
    'Bloxburg Builder',
    'Minecraft Builders',
    'Wordpress Customization',
    'Book Formatting',
    'Custom Landing Page',
    'Web Scraping',
    'NFT Promotion',
];

const JobCategory = () => {
    const chiTietLoaiCongViec = useAppSelector(state => state.congViecReducer.chiTietLoaiCongViec);
    console.log(chiTietLoaiCongViec);
    const { tenLoaiCongViec, dsNhomChiTietLoai } = chiTietLoaiCongViec || {};

    return (
        <div>
            <div className='banner-section'>
                <div className='max-width-container'>
                    <div className='hero-banner-wrapper'>
                        <div className='banner-content'>
                            <h1 className='title'>{tenLoaiCongViec}</h1>
                            <p>Designs to make you stand out.</p>
                            <button>
                                <i className='fas fa-play'></i> How Fiverr Works
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-width-container'>
                <p>Most popular in {tenLoaiCongViec} </p>
            </div>

            <div className='categories-section'>
                <div className='max-width-container'>
                    <h5>Explore {tenLoaiCongViec}</h5>
                    <div className='categories-menu'>
                        {dsNhomChiTietLoai?.map(
                            (item: { tenNhom: string; dsChiTietLoai: { tenChiTiet: string; id: number }[] }) => (
                                <div key={item.tenNhom} className='category-item'>
                                    <div className='image-placeholder'>{/* Image or Placeholder */}</div>
                                    <h3>{item.tenNhom}</h3>
                                    <ul>
                                        {item.dsChiTietLoai.map(subItem => (
                                            <li key={subItem.id}>
                                                <a href='#'>{subItem.tenChiTiet}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className='related-tags max-width-container'>
                <h2>You might be interested in</h2>
                <div className='tags-container'>
                    {tags.map((tag, index) => (
                        <button key={index} className='tag-button'>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};
export default JobCategory;
