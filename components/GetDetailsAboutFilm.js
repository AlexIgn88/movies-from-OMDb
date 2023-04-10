import { useState, useEffect } from 'react';

function GetDetailsAboutFilm({ id }) {
    const
        [result, setResult] = useState(null),
        [error, setError] = useState(null);

    useEffect(() => {
        async function go() {
            try {
                setError(null);
                const response = await fetch(
                    "https://www.omdbapi.com/?apikey=edd125b0&i=" + id
                );
                if (!response.ok) throw new Error(response.status);
                setResult(await response.json());
            } catch (err) {
                setError(err);
            }
        }
        go();
    }, [id]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (error) return <div className="error">Oшибка {error.message}</div>;
    // if (result) return <ShowDetailsAboutFilm obj={result} />
    if (result) return <div className="film-details">
        <div>
            <img className="details-poster" src={result.Poster} alt="poster" />
        </div>
        <div className="film-details-info">
            <div>
                <div className="heading info-heading">Film info</div>
                <div className='notification'>Double Click for close</div>
                {/* <button className='close-details-window' onClick={(evt) => { closeWindow(null) }}>Close</button> */}
            </div>
            <div>
                <div>Title:</div>
                <div className="title">{result.Title}</div>
            </div>
            <div>
                <div>Released:</div>
                <div className="released">{result.Released}</div>
            </div>
            <div>
                <div>Genre:</div>
                <div className="genre">{result.Genre}</div>
            </div>
            <div>
                <div>Country:</div>
                <div className="country">{result.Country}</div>
            </div>
            <div>
                <div>Director:</div>
                <div className="director">{result.Director}</div>
            </div>
            <div>
                <div>Writer:</div>
                <div className="writer">{result.Writer}</div>
            </div>
            <div>
                <div>Actors:</div>
                <div className="actors">{result.Actors}</div>
            </div>
            <div>
                <div>Awards:</div>
                <div className="awards">{result.Awards}</div>
            </div>
        </div>
    </div>
}

export default GetDetailsAboutFilm