import { useEffect, useState } from 'react';
import './search.css';
import { useNavigate , Link} from 'react-router-dom';

const Search =()=> {

    // State variables for search term, results, pagination, and load more state
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState([]);
    const [pagination, setPagination] = useState({prev:null, next:null});
    const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);
    const navigate = useNavigate();

    const apiURL ="https://swapi.dev/api/";// Base API URL for fetching starships

    // Fetch initial starships (first page of results)
    const fetchInitialStarships = async () => {
        try {
            const res = await fetch(`${apiURL}starships/?page=1`);  
            const data = await res.json();
            setResult(data.results); 
            setPagination({ prev: data.previous, next: data.next }); 
            setIsLoadMoreClicked(false);
        } catch (error) {
            console.log("error: ", error);
            showAlert("Error exploring starships");
        }
    };

    // Search for starships based on the search term
    const searchStarship = async (term = "") => {
        try {
            const res = await fetch(`${apiURL}starships/?search=${term}`);
            const data = await res.json();
            setResult(data.results);  
            setPagination({ prev: data.previous, next: data.next });  
        } catch (error) {
            console.log("error: ", error);
            showAlert("Error exploring starships");
        }
    };

     // Load more starships based on the pagination next URL
    const loadMoreStarships = async () => {
        if (!pagination.next) return; 
        try {
            const res = await fetch(pagination.next);
            const data = await res.json();
            setResult((prev) => [...prev, ...data.results]);  
            setPagination({ prev: data.previous, next: data.next }); 
            setIsLoadMoreClicked(true); 
        } catch (error) {
            console.log("error: ", error);
            showAlert("Error exploring starships");
        }
    };

    // Handle the form submit (search functionality)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!searchTerm.trim()){
            showAlert("please type in a search term")
        }else {
            searchStarship(searchTerm.trim())
        }
    }

    // Fetch initial starships when the component mounts
    useEffect(() => {
        fetchInitialStarships();  
    }, []);


    return( 
        <>
        <div className="container">
            <div className="search-nav">
                {/* Back button to homepage */}
                <button className='back-btn' onClick={()=> navigate('/')}> homepage</button>
                <div className="search-bar">
                    <form>
                        <input 
                        type='input'
                        id='search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='search for starship'/>
                    </form>
                    <button type='submit' onClick={handleSubmit}>search</button>
                </div>
            </div>
             
            {/* Display search results */}
            <div id="result">
                {result.map((ship) => (
                    <div key={ship.url} className="starship-card">
                        <div className="img-div">
                            <img src="/starship-.png" alt={ship.name} />
                        </div>
                        <h3>{ship.name}</h3>
                        <p>Model: {ship.model}</p>
                        <p>Hyperdrive Rating: {ship.hyperdrive_rating}</p>
                        <div className="moredetail">
                            <Link to={`/starshipdetail/${ship.url.split('/')[5]}`} className="moredetail-btn">More Detail</Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Load more button */}
            <div className="loadmore-btn">
                {pagination.next &&  !isLoadMoreClicked && (
                        <button className="load-more" onClick={loadMoreStarships}>More Starships</button>
                    )}
            </div>
        </div>
        </>
    )
}

export default Search;