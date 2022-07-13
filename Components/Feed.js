import Posts from './Posts'

// Shows all the data in the feed
const Feed = () => {
    return (
        <main className="flex flex-wrap justify-center">
            <section>
                <Posts />
            </section>
        </main>
    )
}

export default Feed