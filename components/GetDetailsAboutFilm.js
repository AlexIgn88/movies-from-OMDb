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

    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (result) return <ShowDetailsAboutFilm obj={result} />
}

function ShowDetailsAboutFilm({ obj }) {
    document.querySelector('.info-heading').classList.remove('hide');
    return <div className="film-details">
        <div>
            <img className="details-poster" src={obj.Poster} alt="poster" />
        </div>
        <div className="film-details-info">
            <div>
                <div>Title:</div>
                <div className="title">{obj.Title}</div>
            </div>
            <div>
                <div>Released:</div>
                <div className="released">{obj.Released}</div>
            </div>
            <div>
                <div>Genre:</div>
                <div className="genre">{obj.Genre}</div>
            </div>
            <div>
                <div>Country:</div>
                <div className="country">{obj.Country}</div>
            </div>
            <div>
                <div>Director:</div>
                <div className="director">{obj.Director}</div>
            </div>
            <div>
                <div>Writer:</div>
                <div className="writer">{obj.Writer}</div>
            </div>
            <div>
                <div>Actors:</div>
                <div className="actors">{obj.Actors}</div>
            </div>
            <div>
                <div>Awards:</div>
                <div className="awards">{obj.Awards}</div>
            </div>
        </div>
    </div>
}

export default GetDetailsAboutFilm