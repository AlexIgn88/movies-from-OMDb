import { useState } from 'react';
import GetFilms from './GetFilms'
import GetDetailsAboutFilm from '../components/GetDetailsAboutFilm'

function SearchOnOMDb() {
    const [inputValue, setInputValue] = useState(''),
        [selectValue, setSelectValue] = useState('movie'),
        [searchValue, setSearchValue] = useState(''),
        [idOfFilm, setIdOfFilm] = useState(null);

    return <div id="main">
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
                                    setInputValue(evt.target.value);
                                    setSearchValue('');
                                }}
                            />
                        </div>
                        <div>
                            <select
                                onChange={(evt) => {
                                    setSelectValue(evt.target.value);
                                    setSearchValue('');
                                }}
                            >
                                <option>movie</option>
                                <option>series</option>
                                <option>episode</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={_ => {
                            setSearchValue([inputValue, selectValue]);;
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div id="result">
            {searchValue && <GetFilms
                searchValue={searchValue}
                setIdOfFilm={setIdOfFilm}
            />}
        </div>
        {idOfFilm && <div id="details" onDoubleClick={(evt) => setIdOfFilm(null)}>
            <GetDetailsAboutFilm
                id={idOfFilm}
            />
        </div>}
    </div>
}

export default SearchOnOMDb