function NoResults({ textOfErr }) {
    document.querySelector('.spinner').classList.add('hide');

    return (
        <div className="no-results">{textOfErr}</div>
    );
}

export default NoResults