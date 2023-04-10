function FilmCards({ films, setIdOfFilm }) {
    return (
        <>
            {films.map(obj => (
                <div className="film-card" key={obj.imdbID}>
                    <div>
                        <img className="poster" src={obj.Poster} alt="poster" />
                    </div>
                    <div className="film-info">
                        <div className="type">{obj.Type}</div>
                        <div className="title">{obj.Title}</div>
                        <div className="year">{obj.Year}</div>
                        <button data-id={obj.imdbID} onClick={
                            evt => {
                                setIdOfFilm(evt.currentTarget.closest('button').dataset.id);
                            }
                        }>Details</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FilmCards