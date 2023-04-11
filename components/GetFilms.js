import { useState, useEffect } from 'react'
import FilmCards from '../components/FilmCards'
import Spinner from '../components/Spinner'

function GetFilms({ searchValue, setIdOfFilm, setNotification }) {
    const
        [fetching, setFetching] = useState(true),
        [error, setError] = useState(null),
        [films, setFilms] = useState([]),
        [currentPage, setCurrentPage] = useState(1),
        [totalCount, setTotalCount] = useState(0),
        [showButtonScrollToTop, setShowButtonScrollToTop] = useState(false),
        [scrollToTop, setScrollToTop] = useState(false);

    useEffect(() => {
        setError(null);
        if (fetching) {
            fetch(`https://www.omdbapi.com/?apikey=edd125b0&s=${searchValue[0]}&type=${searchValue[1]}&page=${currentPage}`)
                .then(response => response.json())
                .then(result => {

                    console.log('ShowFilms - result', result);

                    if (result.Response === 'True') {
                        setTotalCount(+result.totalResults);
                        setFilms([...films, ...result.Search]);
                        setCurrentPage(oldPage => oldPage + 1);
                    } else setError(result.Error);
                })
                .catch(err => setError(err.message))
                .finally(() => setFetching(false));
        }
    }, [fetching])

    function ScrollToTopOnMount() {
        useEffect(() => {
            window.scrollTo(0, 0);
            setScrollToTop(false);
        }, []);
        return null;
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHadler);
        return function () {
            document.removeEventListener('scroll', scrollHadler);
        }
    }, [films, totalCount])

    const scrollHadler = (evt) => {
        console.log('scrollHadler: films.length and totalCount', films.length, totalCount, films.length < totalCount);

        if (window.scrollY > 600) setShowButtonScrollToTop(true);
        else setShowButtonScrollToTop(false)

        if (evt.target.documentElement.scrollHeight - (evt.target.documentElement.scrollTop + window.innerHeight) < 100
            && (films.length < totalCount)) setFetching(true);
    }

    // console.log('ShowFilms. films= ', films);
    // console.log('ShowFilms. error= ', error);

    useEffect(() => {
        if (error) setNotification(error);
    }, [error]);

    if (fetching || films) return <>
        {films && <>
            <div className="heading films-heading">Films: {totalCount} films found</div>
            <div className='film-cards'>
                <FilmCards
                    films={films}
                    setIdOfFilm={setIdOfFilm}
                />
                {showButtonScrollToTop && <button className="button-up" onClick={() => { setScrollToTop(true) }}>&uArr;	</button>}
                {scrollToTop && <ScrollToTopOnMount />}
            </div>
        </>}
        {fetching && <Spinner />}
    </>
}

export default GetFilms