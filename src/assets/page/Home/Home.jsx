export default function Home() {
    return( 
        <>
        <div className="container">
            <div className="explore-div">
                <h1 className="explore-title">Are you ready to explore the Star Wars starships?</h1> 
                {/* Button that links to the starships page */}
                <a className='btn-explore' href="/starships">explore</a>
            </div>
        </div>
        </>
    )
}