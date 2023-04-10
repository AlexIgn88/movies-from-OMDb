function DetailedFilmCard({ film }) {
    return <div className="film-details">
        <div>
            <img className="details-poster" src={film.Poster} alt="poster" />
        </div>
        <div className="film-details-info">
            <div>
                <div className="heading info-heading">Film info</div>
                <div className='notification'>Double click for close</div>
            </div>
            <div>
                <div>Title:</div>
                <div className="title">{film.Title}</div>
            </div>
            <div>
                <div>Released:</div>
                <div className="released">{film.Released}</div>
            </div>
            <div>
                <div>Genre:</div>
                <div className="genre">{film.Genre}</div>
            </div>
            <div>
                <div>Country:</div>
                <div className="country">{film.Country}</div>
            </div>
            <div>
                <div>Director:</div>
                <div className="director">{film.Director}</div>
            </div>
            <div>
                <div>Writer:</div>
                <div className="writer">{film.Writer}</div>
            </div>
            <div>
                <div>Actors:</div>
                <div className="actors">{film.Actors}</div>
            </div>
            <div>
                <div>Awards:</div>
                <div className="awards">{film.Awards}</div>
            </div>
        </div>
    </div>
}

export default DetailedFilmCard