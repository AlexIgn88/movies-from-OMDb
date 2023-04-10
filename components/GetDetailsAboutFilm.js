import { useState, useEffect } from 'react';
import DetailedFilmCard from '../components/DetailedFilmCard'

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
    if (result) return <DetailedFilmCard film={result} />
}

export default GetDetailsAboutFilm