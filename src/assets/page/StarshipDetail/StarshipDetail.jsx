import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './starshipdetail.css'

export default function StarshipDetail() {
    const { id } = useParams();  // Extract the starship id from the URL
    const [starshipDetail, setStarshipDetail] = useState(null);  
    const navigate = useNavigate();

    // Function to fetch starship details based on the id
    const fetchStarshipDetail = async () => {
        try {
            const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
            const data = await res.json();
            setStarshipDetail(data);  
        } catch (error) {
            console.log("Error fetching starship detail:", error);
        }
    };

    // useEffect hook runs when the component mounts or id changes
    useEffect(() => {
        if (id) {
            fetchStarshipDetail();  
        }
    }, [id]);  

    
    if (!starshipDetail) {
        return <div>Loading...</div>;  
    }

    return (
        <div className="container">
            {/* Button to navigate back to the list of starships */}
            <div className="backstarship">
                <button className='back-btn' onClick={() => navigate('/starships')}>Back to Starships</button>
            </div>
            <div className="starship-detail">
                <div className="img-div">
                    <img src="/public/starship-.png" alt={starshipDetail.name} />
                </div>
                <div className="starship-detail-context">
                    <p>Model: {starshipDetail.model}</p>
                    <p>Hyperdrive Rating: {starshipDetail.hyperdrive_rating}</p>
                    <p>Passengers: {starshipDetail.passengers}</p>
                    <p>Manufacturer: {starshipDetail.manufacturer}</p>
                    <p>Crew: {starshipDetail.crew}</p>
                    <p>Max Speed: {starshipDetail.max_atmosphering_speed}</p>
                </div>
            </div>
        </div>
    );
}
