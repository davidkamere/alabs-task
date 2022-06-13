import Post from './Post'

const posts = [
    {
        id:"122",
        username: "mozz",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "This is a job asssessment"
    },
    {
        id:"123",
        username: "kamere",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "We did it joe"
    }
]


// Renders all the posts
const Posts = () => {
    return(
        <div>
            {posts.map(post => (
                <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption}/>
            ))}
           
        </div>
    )
}

export default Posts