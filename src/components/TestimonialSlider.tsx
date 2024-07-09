import { useRef, useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';

const testimonials = [
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg',
        name: 'Brighid Gannon (DNP, PMHNP-BC)',
        title: 'Co-Founder',
        companyLogo: 'path/to/companyLogo1.png',
        testimonial:
            'We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl',
    },
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg',
        name: 'John Doe',
        title: 'CEO',
        companyLogo: 'path/to/companyLogo2.png',
        testimonial:
            'Fiverr has been an essential partner in our growth. Their platform made it easy to find the right talent quickly.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi',
    },
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg',
        name: 'Jane Smith',
        title: 'Marketing Director',
        companyLogo: 'path/to/companyLogo3.png',
        testimonial:
            'The results from Fiverr have consistently exceeded our expectations. We couldn’t be happier with the quality of work.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw',
    },
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg',
        name: 'Jane Smith',
        title: 'Marketing Director',
        companyLogo: 'path/to/companyLogo3.png',
        testimonial:
            'The results from Fiverr have consistently exceeded our expectations. We couldn’t be happier with the quality of work.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun',
    },
];

const TestimonialSlider = () => {
    const sliderRef = useRef<Slider | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: (current: number) => {
            if (current === testimonials.length - 1 && sliderRef.current) {
                setTimeout(() => {
                    sliderRef.current?.slickGoTo(0);
                }, 500); // Thời gian chờ trước khi chuyển về slide đầu tiên
            }
        },
    };

    const openModal = (videoUrl: string) => {
        setCurrentVideoUrl(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideoUrl('');
    };

    return (
        <div className='testimonials'>
            <Slider ref={sliderRef} {...settings}>
                {testimonials.map((item, index) => (
                    <div key={index}>
                        <div className='testimonial-slide'>
                            <div className='video-thumbnail'>
                                <img
                                    src={item.videoTeaser}
                                    alt='Video Teaser'
                                    className='video-teaser'
                                    onClick={() => openModal(item.videoUrl)}
                                />
                                <button
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        openModal(item.videoUrl);
                                    }}>
                                    <img
                                        width='100%'
                                        height='100%'
                                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAQlBMVEX///+zs7Ovr6/o6Oiurq61tbX8/Py4uLjy8vL5+fns7OzLy8v29vbPz8+7u7vu7u7Dw8Pi4uLX19fU1NTd3d3GxsaBRewXAAAK9UlEQVR4nO1di7KjKBANSOMj0Whi/v9XB4y0mCgCguZOcbZqq3brRjnS9IumuVwSEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhL+EvjZA4gPXmT989o2ORACAHnevOpnnxX/BfXy3l8bIJRSMgOVIM21v5dnD9EXcn7ujxYkkffUkSVQCm1//5OSzLMrUPY5dcugeZ3Jn/wlmtWVMLI+c0tTWVdnD9oOch5ufW43dx8sm/5vrMmiJh70BIRQQ337+SVZXMU4vQiOE3ktzqawDimf16/pg0GRStvAiLSEAqBbj6+Vyq63s5msgF/KBfkU4xfMmuuju9/K8q0teVkWVfcQdpKxb4EWX6Pmvymr/ZvQXOhYXnervgsvujr/IilmmHSHjtwORaOPVMqeEMRXvy1xRf8S00zn0krb4tdm8fGlMsirsx1j2b2+5fsRdbyuKFo6Vxo0t5g9HbdHPuMIhLU/pHE6bQZA2rU283hK1rC5FIDPU6KgZpOGkevv5et/ZS3TZ5GwOug4fVG2TOMHpK2kqvdUE1U7k1Xa/oAfV+S6hFLYq+e7mc6huVyMp2rVSvfRKHl6z94I8fua6maV3c8l2M0+eHPfH+OJ31cz08pO1Df80qvPLRYgsGewBz+1aQR6ooPTU0CGFMJFsPySaXIqKZ4kqNoMChMRVutpGloY/5NmsVO+JFCgwSRUgdeaETpnLVZ0ctNYH+EFvWb+6QlJnEIX0TifONNUKj089C+nVULIPdJLKs1o5Ed7N+hdgSQYS9XpFNtI71hBzeLPoMR9shnC3B5oMzIkSKMSHPQZLsUDbUZBQRljoWTiftlM06jHhcQtiqjhu5ZVGPU3GQ162FJ8KBldN/T80jFKw+QhaqQYxewuoJh80dfqH93eDs8zhI4f9bZ83jFWsZn02/r4B2sdIiIWuAH6FgfI6RAxKf296kpx5Y8Ijk21O0jP0EU9wgcvicpsGwyUxlBEBq/dy7GmauVDfJtYjwzBpNmQoRyTmMfHzuXIG9wwCB7EfKKYDLDB1POZ1ywTSt2uTWwuDT8cYBTFEK/qRcaI8IOhTH22+3yfWjkZ5LrrOZuYvBnjgvicw+GT7NoX5BgOR46jrvgeY+5kiaFAv0NNoAqPOom8wNe0RguwzBBosyNURjNMY65EDJo2sgqLDKWcMf99wUolFcLnhCbcMIu54VusSOkwvtrPcnDp74+vL6MZRVwL696MGs4aQ+Gtg+dyRM8mlgMuhpVPq3Drb1fnUE5j45c5w5XYeP3cApOvuZWENjIUnhx7+aj8Tk2iydnYAX5RxTKQb2kL8xwOZQwecRUfZQhorJ1TNWi6uQ7MDN8PGeMqlzX5xG/kS8EMzJhsGyQLhkJhOMdVN/xpnBS48mcMkb2CBcPBOro6cq0aQhwxVZrUIqtnM4eSIh2qZuznsVNWf1MT+OCOPsW2jrCS0vfDcpeovVSOP4uhTR/q6dtC6sBQpjkcLEer3JoYFVNqp2JbkzowHPaQZVxlGR5jcVmElFQ5bmgDs9AO9nM4wtaRw+AmQr7m/nYoQCzybbgwHEpsmW1cpQLwCAuxVy6bjaJ2nkNCZVx12darymRFSCsql81qB8idIbF05FR4Q8NH+mgNbTSfO0Mpqwy2ldhdPTd4fMFxs8Lqr33mUH6+fMuRK/GT7K0v+wTmSa3UtC9DER+/jKV6fAoSQ2drcMRW8u/LUAorfRqTeK/xD4Mr0370aGzs/Q6GwytgPUHO0eYHLwV7Tg+OzfBd5Lj2YFUNSR+BGWLoZBWZ7WQIhgR5paLUa2CGGJlZLfCdDGWiQvrWS+ryph5sEQA4AVWYVXplN0OyWqqPcb456+4OVc1t2NgOzBBkqf43CSw3awIzxDI2q8eGYEiW41zchLKJAFygXpofyHCx/hkZhs63oTt4HEMhpgs+sEqaBmeoXnscQ1jJqP0/DOVm49LL/g+GsuZxzT2MxVA99xBNA4ZdRh7LWuCXO8IejhmNRWCAGDoEPsynEfOXDy0kVh5dqjMQofOJY1gW3S8Vwzcne4spMR1WSutxBHa7Pt4x/hhUGMaODw69OfMcH2yXxfPIRA3/Xg8MEe/4EMLn9bEWOVqML4tRLR7+eDOE4AnTbAo8LeDDcDieub22VJ5GhOKBc21OeUpXhmBf9taMP4DQuTY9T7kNR4ZAh0SpDbjTOJwwGkS7LJ4jQ6sF+MZdrZbQBp9PqajA+xbSBXUoBOvVMMLv5Pcudshhh5RSp+qh8UODXd7WCbglYuPTu+zjux0rwkLa8HW0ag+YhNoDBmOMtIJCLcMYNfuYMQ2zjz80sKldVX7P7MslnIEL0cLltZJSaoiR1tCOgUWUAky0+XRbQGzq2nL3imheqmITFqWrpAqCLTxCC4YPnyGiHIVOlr6BRx62Y88thrKgzYdhq1RplLo2Pg16V20iELYdIy0jdm0i1rLQzdDMwBAcXLTPhz7jCilXcT5sVwaaavVlCxs/NTGdm4lVI1yphbjZQ2H9vIVXgfeIDs9cRTo/zvVieb9K9j2nLeXrQb0+Crh2fHSr18giQ5r3O06Tcq0KO95B0hsuhPZiHOwXQ8cYaREtPi3iOVKVU9xS158MRRDv4aLNgX0cYp57msoEwOnsGjAPF+0TDZ52jnqK1OP8oRzYXj+ZT13FIO75QxGf4VI0GbXZHLJrgLYDHPsZRT1+qKVrzIkSjeFwAHh/p+4av1jsXoroGg7VUesDfzOEID0VLlMTFzGT0RucoG9o3g4evgT1i5G+gWe6LHzi/S+bJnGpoGf8I3mUjgZopjACZfSIngqyTZviaDQBvAomT8f2xdB9i60t70Dfe1r7B7XDKrQXGi1GIPDpkx7VR+kxNf2J3waXa33FaB/jyNrSO/HceIzk+iem7xklSbqMKcaASA0FJ2jOUfAtQ9Nrp+8as2cjlwSxFvHYBpi1FjrEbEtZUVDeTLgWt3bQu1LH67pXkXHFG/uKxQEWI8ecRWwpKF7WHNz7kl9uepvrGJ4Gn1wZuRF3wtUl2E1FZrFjGI2H6sMsW/XH7T+5gk5rSS2jxcDGGJsJxmtyuwHZGnGS09B3Ndxa7MN8ZkfvTluLYe9qyIimZM4jyGeCCqwOIafyJBCf7pOASHrMGplmM8CistAKVT45MuKf2D1gt0ZDdISYRl7PEpHnaFEdRa7d1QDDYWVPlu+f9fr9FvC+3+JklK32zYHs6MkmHe2Gzj5Y4G79vnjSyTZLufK6R0cik9cF6Ld3mI4EH4rh5hT9rpLG+qqnCbyb3xUkuP7MXUFc2medoTxR8HS87+kJVHfmydDY9VemUKKfZhFGSWs720VU9i1hZE5w925OcBTt/D4qKaxU3bu2NBfq/xV9+3HjJQDs6K8YERl8UhRBBwXDhbj83r/IoKZm98rB4AGG7goRAvzxubX9ttny3t9nVxW3kg+bULy8FVn3eDWj6QPQ9JQ8lBBotyMGbtfVO0iHOywhl3jfYbn8h5S4l2QeCC7vIV3lqCtbIJ+KZSTIfpnfiNvzwzp+0lv4z1GiKQTpUh8fZd943AdMWWNtXk6GVBOV66XADOrTgwhXVHX+ZSF1sRz8gsFKMJb/lSurP1EMd6uPy2yB4mBJoO1/+JJjMwbbd++vDSELxkFaj6buC/6bxt0RN3nB8attpC0EaJr2VT+6cLvgCfExiCsfXbb91UMJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCb+Kfx6GVSVNcRBVAAAAAElFTkSuQmCC'
                                        alt='Play video'
                                    />
                                </button>
                            </div>
                            <div className='text-content'>
                                <div className='info'>
                                    <h5>
                                        {item.name}, {item.title}
                                    </h5>
                                    <div className='logo-wrapper'>
                                        <img src={item.companyLogo} alt='Company Logo' className='company-logo' />
                                    </div>
                                </div>
                                <p>
                                    "<em>{item.testimonial}</em>"
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0',
                        margin: '0',
                        width: '100%',
                        maxWidth: '900px',
                        height: '455px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        zIndex: 9999,
                    },
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}>
                <video
                    width='100%'
                    style={{
                        margin: '0',
                        padding: '0',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    autoPlay
                    controls>
                    <source src={currentVideoUrl} type='video/mp4' />
                </video>
            </Modal>
        </div>
    );
};

const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}`}
            style={{
                ...style,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'grey',
                borderRadius: '50%',
                right: '-25px !important',
                transition: 'background 0.3s ease',
            }}
            onClick={onClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='24px' height='24px'>
                <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' />
            </svg>
        </div>
    );
};

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}`}
            style={{
                ...style,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'grey',
                borderRadius: '50%',
                right: '-25px !important',
                transition: 'background 0.3s ease',
            }}
            onClick={onClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='24px' height='24px'>
                <path d='M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z' />
            </svg>
        </div>
    );
};

export default TestimonialSlider;
