import { useState, useEffect } from 'react';
import DetailedFilmCard from '../components/DetailedFilmCard'
import Notification from '../components/Notification'
import Spinner from '../components/Spinner'

function GetDetailsAboutFilm({ id }) {
    const
        [fetching, setFetching] = useState(true),
        [error, setError] = useState(null),
        [film, setFilm] = useState(null);

    useEffect(() => {
        setError(null);
        fetch(`https://www.omdbapi.com/?apikey=edd125b0&i=${id}`)
            .then(response => response.json())
            .then(result => {

                console.log('GetDetailsAboutFilm - result', result);

                if (result.Response === 'True') { setFilm(result) } else setError(result.Error);
            })
            .catch(err => setError(err.message))
            .finally(() => setFetching(false));
    }, [id]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (error) return <Notification notification={error} />
    if (fetching || film) return <>
        {fetching && <Spinner str={'on-center'} />}
        {film && <DetailedFilmCard film={film} />}
    </>
}

export default GetDetailsAboutFilm