import BlogList from "./blogList";
import useFetch from "./useFetch" 

const Home = () => {
    const {data: blogs,isPending, error} = useFetch("http://localhost:8000/blogs")
    return (
        <div className="home">
            {error && <div>{error}</div>}
            {blogs && <BlogList blogs = {blogs} title = "All Blogs"/>}
            {isPending && <div>loading.......</div>}
        </div>
    );
}
export default Home;