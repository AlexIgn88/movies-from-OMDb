import { useState, useEffect } from 'react';
import FilmCards from '../components/FilmCards'
import NoResults from '../components/NoResults'

function ShowFilms({ searchValue, setIdOfFilm }) {
    const [films, setFilms] = useState([]),
        [currentPage, setCurrentPage] = useState(1),
        [fetching, setFetching] = useState(true),
        [totalCount, setTotalCount] = useState(0),
        [error, setError] = useState(null);

    console.log('totalCount- ', totalCount);

    useEffect(() => {
        // setError(null);
        if (fetching) {
            console.log('fetching');
            fetch(`https://www.omdbapi.com/?apikey=edd125b0&s=${searchValue[0]}&type=${searchValue[1]}&page=${currentPage}`)
                .then(response => response.json())
                .then(result => {

                    console.log('ShowFilms - result', result);

                    const { Response: flag } = result;
                    if (flag === 'True') {
                        const newArrayOfFilms = result.Search;

                        console.log('ShowFilms - result.totalResults', result.totalResults);

                        setTotalCount(result.totalResults);
                        console.log('ShowFilms - newArrayOfFilms', newArrayOfFilms);
                        setFilms([...films, ...newArrayOfFilms]);
                        setCurrentPage(prevState => prevState + 1);
                    } else setError(result.Error);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHadler);
        return function () {
            document.removeEventListener('scroll', scrollHadler);
        }
    }, [])

    // const scrollHadler = (evt) => {
    //     if (evt.target.documentElement.scrollHeight - (evt.target.documentElement.scrollTop + window.innerHeight) < 100
    //         && films.length === totalCount) {
    //         // console.log('scroll');
    //         setFetching(true);
    //     }
    //     // console.log('scrollHeight', evt.target.documentElement.scrollHeight);
    //     // console.log('scrollTop', evt.target.documentElement.scrollTop);
    //     // console.log('innerHeight', window.innerHeight);
    // }

    // const scrollHadler = (evt) => {
    //     if (evt.target.documentElement.scrollHeight - (evt.target.documentElement.scrollTop + window.innerHeight) < 100) {
    //         // console.log('scroll');
    //         setFetching(true);
    //     }
    //     // console.log('scrollHeight', evt.target.documentElement.scrollHeight);
    //     // console.log('scrollTop', evt.target.documentElement.scrollTop);
    //     // console.log('innerHeight', window.innerHeight);
    // }

    console.log('ShowFilms films.length', films.length);

    const scrollHadler = (evt) => {
        // if (films.length === totalCount) return;
        if (isPlaceholderVisible()) {
            setFetching(true);
        }
    }

    function isPlaceholderVisible() {
        if (document.querySelector('.spinner').matches('.hide')) return
        return document.querySelector('.spinner').getBoundingClientRect().top < window.innerHeight;
    }

    console.log('Запуск JsonplaceholderPosts. films ', films);

    if (error) return <NoResults
        textOfErr={error}
    />

    if (films) return <FilmCards
        films={films}
        setIdOfFilm={setIdOfFilm}
    />
}

export default ShowFilms