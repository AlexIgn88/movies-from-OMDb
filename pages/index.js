import { useState, useEffect, useCallback } from 'react';

export default function SearchOnOMDb() {
    const [inputValue, setInputValue] = useState(''),
        [searchValue, setSearchValue] = useState(''),
        [detailsOfFilm, setdetailsOfFilm] = useState('');

    return (
        <>
            <FormForSearch
                inputValue={inputValue}
                newValue={inputValue => setInputValue(inputValue)}
                searchValue={searchValue}
                toSearch={searchValue => setSearchValue(searchValue)}

                detailsOfFilm={detailsOfFilm}
                getIdOfFilm={detailsOfFilm => setdetailsOfFilm(detailsOfFilm)}
            />
        </>
    );
}

function FormForSearch({ inputValue, newValue, searchValue, toSearch, detailsOfFilm, getIdOfFilm }) {
    return (
        <div id="main">
            <div id="outside-div-of-form-for-search">
                <div className="heading">Search:</div>
                <div id="form-for-search">
                    <div>
                        <div>
                            <div>Title:</div>
                            <div>Type:</div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="search"
                                    id="search"
                                    value={inputValue}
                                    onInput={(evt) => {
                                        newValue(evt.target.value);
                                        toSearch('');
                                        document.querySelector('.films-heading').classList.add('hide')
                                    }}
                                />
                            </div>
                            <div>
                                <select>
                                    <option>movie</option>
                                    <option>series</option>
                                    <option>episode</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={_ => { toSearch(inputValue); newValue('') }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="heading films-heading hide">Films:</div>
            <div id="result">
                <>
                    <FetchFilms
                        text={searchValue}
                        detailsOfFilm={detailsOfFilm}
                        getIdOfFilm={getIdOfFilm}
                    />
                </>
            </div>
            <div className="heading info-heading hide">Film info:</div>
            <div id="details">

            <GetDetailsAboutFilm id={detailsOfFilm} />

            </div>
            <div className="spinner hide">
                <img alt=""
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
                />
            </div>
        </div>
    );
}

function FetchFilms({ text, detailsOfFilm, getIdOfFilm }) {
    if (!text) return;

    const
        [result, setResult] = useState(null),
        [error, setError] = useState(null);

    useEffect(() => {
        async function go() {
            try {
                setError(null);
                const response = await fetch(
                    "https://www.omdbapi.com/?apikey=a2b07930&s=" + text
                );
                if (!response.ok) throw new Error(response.status);
                setResult(await response.json());
            } catch (err) {
                setError(err);
            }
        }
        go();
    }, [text]);

    if (error) return <div className="error">Oшибка {error.message}</div>;

    if (result) {
        if (result.Response === 'True') return <FilmCards result={result} detailsOfFilm={detailsOfFilm} getIdOfFilm={getIdOfFilm} />
        else return <NoResults textOfErr={result.Error} />
    }
}

function FilmCards({ result, getIdOfFilm }) {
    const [detailsOfFilm, setdetailsOfFilm] = useState('');

    document.querySelector('.films-heading').classList.remove('hide');

    return (
        <>
            {result.Search.map(obj => (
                <>
                    <div className="film-card">
                        <div>
                            <img className="poster" src={obj.Poster} alt="poster" />
                        </div>
                        <div className="film-info">
                            <div className="type">{obj.Type}</div>
                            <div className="title">{obj.Title}</div>
                            <div className="year">{obj.Year}</div>
                            <button data-id={obj.imdbID} onClick={
                                evt => {
                                    setdetailsOfFilm(evt.currentTarget.closest('button').dataset.id);
                                    getIdOfFilm(evt.currentTarget.closest('button').dataset.id);
                                }
                            }>Details</button>
                        </div>
                    </div>
                </>
            ))}




        </>
    );
}

function NoResults({ textOfErr }) {
    return (
        <div className="no-results">{textOfErr}</div>
    );
}

function GetDetailsAboutFilm({ id }) {
    if (!id) return;

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

    if (result) return <ShowDetailsAboutFilm obj={result}/>
}

function ShowDetailsAboutFilm({obj}) {

    document.querySelector('.info-heading').classList.remove('hide');

    return (
        <>

            <div class="film-details">
                <div>
                    <img class="details-poster" src={obj.Poster} alt="poster" />
                </div>
                <div class="film-details-info">
                    <div>
                        <div>Title:</div>
                        <div class="title">{obj.Title}</div>
                    </div>
                    <div>
                        <div>Released:</div>
                        <div class="released">{obj.Released}</div>
                    </div>
                    <div>
                        <div>Genre:</div>
                        <div class="genre">{obj.Genre}</div>
                    </div>
                    <div>
                        <div>Country:</div>
                        <div class="country">{obj.Country}</div>
                    </div>
                    <div>
                        <div>Director:</div>
                        <div class="director">{obj.Director}</div>
                    </div>
                    <div>
                        <div>Writer:</div>
                        <div class="writer">{obj.Writer}</div>
                    </div>
                    <div>
                        <div>Actors:</div>
                        <div class="actors">{obj.Actors}</div>
                    </div>
                    <div>
                        <div>Awards:</div>
                        <div class="awards">{obj.Awards}</div>
                    </div>
                </div>
            </div>
        </>
    );
}