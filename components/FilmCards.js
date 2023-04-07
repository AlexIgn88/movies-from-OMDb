function FilmCards({ result, getIdOfFilm }) {
    document.querySelector('.films-heading').classList.remove('hide');
    document.querySelector('.spinner').classList.remove('hide');

    return (
        <>
            {result.Search.map(obj => (
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
                                getIdOfFilm(evt.currentTarget.closest('button').dataset.id);
                            }
                        }>Details</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FilmCards