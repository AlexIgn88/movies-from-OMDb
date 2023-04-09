import { useState, useEffect } from 'react';
import FilmCards from '../components/FilmCards'
import NoResults from '../components/NoResults'


function FetchFilms({ text, detailsOfFilm, getIdOfFilm, pageNumber, setTimerId }) {
    const
        [result, setResult] = useState(null),
        [error, setError] = useState(null);

    useEffect(() => {
        async function go() {
            try {
                setError(null);
                const response = await fetch(
                    "https://www.omdbapi.com/?apikey=a2b07930&s=" + text + "&page=" + pageNumber
                );
                if (!response.ok) throw new Error(response.status);
                setResult(await response.json());
            } catch (err) {
                setError(err);
            }
        }
        go();
    }, [text, pageNumber]);

    if (error) return <div className="error">Oшибка {error.message}</div>;

    if (result) {
        
        console.log('FetchFilms- ', result);

        if (result.Response === 'True') return <FilmCards result={result} detailsOfFilm={detailsOfFilm} getIdOfFilm={getIdOfFilm} />
        else return <NoResults
            textOfErr={result.Error}
            setTimerId={setTimerId}
        />
    }
}

export default FetchFilms