import { useState, useEffect, memo } from 'react';
import DetailedFilmCard from '../components/DetailedFilmCard';
import Notification from '../components/Notification';

function GetDetailsAboutFilm({ id, setIdOfFilm }) {
    const
        [fetching, setFetching] = useState(true),
        [error, setError] = useState(null),
        [film, setFilm] = useState(null),
        DetailedFilmCardWithMemo = memo(DetailedFilmCard);

    useEffect(() => {
        setError(null);
        fetch(`https://www.omdbapi.com/?apikey=edd125b0&i=${id}`)
            .then(response => response.json())
            .then(result => {

                // console.log('GetDetailsAboutFilm - result', result);

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

    if (error) return <Notification
        notification={error}
        setNotification={setIdOfFilm}
    />
    if (fetching || film) return <>
        {fetching && <div className='spinner on-center'></div>}
        {film && <DetailedFilmCardWithMemo
            film={film}
            setIdOfFilm={setIdOfFilm}
        />}
    </>
}

export default GetDetailsAboutFilm