import blogData from '../../blog.json';
console.log(blogData);
type Blog = {
    id: number;
    title: string;
    cover: string;
    author: string;
};
const Blog = () => {
    return (
        <div className='container'>
            <div className='blog'>
                {blogData.map((blog: Blog) => (
                    <div className='card' key={blog.id}>
                        <img src={blog.cover} alt='' />
                        <div className='details'>
                            <h2>{blog.title}</h2>
                            <h4>{blog.author}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
