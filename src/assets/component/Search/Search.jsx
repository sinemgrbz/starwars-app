import { useEffect, useState } from 'react';
import './search.css';
import { useNavigate } from 'react-router-dom';

const Search =()=> {

    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState([]);
    const [starshipDetail, setStarshipDetail] = useState("");
    const [pagination, setPagination] = useState({prev:null, next:null});
    const navigate = useNavigate();

    const apiURL ="https://swapi.dev/api/";

    const fetchInitialStarships = async () => {
        try {
            const res = await fetch(`${apiURL}starships/`);
            const data = await res.json();
            setResult(data.results);  // İlk gelen veriyi kaydet
            setPagination({ prev: data.previous, next: data.next });  // Pagination verisini ayarla
        } catch (error) {
            console.log("error: ", error);
            showAlert("Error exploring starships");
        }
    };

    const searchStarship = async (term = "") => {
        try {
            const res = await fetch(`${apiURL}starships/?search=${term}`);
            const data = await res.json();
            setResult(data.results);  // Sonuçları güncelle
            setPagination({ prev: data.previous, next: data.next });  // Pagination verisini güncelle
        } catch (error) {
            console.log("error: ", error);
            showAlert("Error exploring starships");
        }
    };



    const showAlert = (message) => {
        const notIf = document.createElement("div");
        notIf.classList.add("toast");
        notIf.innerHTML=message;
        document.body.appendChild(notIf);
        setTimeout(()=>  notIf.remove(),3000 )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!searchTerm.trim()){
            showAlert("please type in a search term")
        }else {
            searchStarship(searchTerm.trim())
        }
    }

    useEffect(() => {
        fetchInitialStarships();  // Başlangıçta bazı starship'leri yükle
    }, []);


    return( 
        <>
        <div className="container">
            <button className='back-btn' onClick={()=> navigate('/')}> homepage</button>
            <form>
                <input 
                type='input'
                id='search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='search for starship'/>
            </form>
            <button type='submit' onClick={handleSubmit}>search</button>
            <div id="result">
                {result.map((ship) => (
                    <div key={ship.url} className="starship-card">
                        <img src="/public/starship.jpeg" alt={ship.name} />
                        <h3>{ship.name}</h3>
                        <p>Model: {ship.model}</p>
                        <p>Manufacturer: {ship.manufacturer}</p>
                        <p>Hyperdrive Rating: {ship.hyperdrive_rating}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default Search;