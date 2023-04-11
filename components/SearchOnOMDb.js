import { useState } from 'react';
import GetFilms from '../components/GetFilms'
import GetDetailsAboutFilm from '../components/GetDetailsAboutFilm'
import Notification from '../components/Notification'

function SearchOnOMDb() {
    const [inputValue, setInputValue] = useState(''),
        [selectValue, setSelectValue] = useState('movie'),
        [searchValue, setSearchValue] = useState(''),
        [idOfFilm, setIdOfFilm] = useState(null),
        [notification, setNotification] = useState(null);

    const handleOnKeyDown = (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault(); 
            setSearchValue([inputValue, selectValue]); 
        }
    };

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
                                onKeyDown={(evt) => handleOnKeyDown(evt)}
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
                            setSearchValue([inputValue, selectValue]);
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
                setNotification={setNotification}
            />}
        </div>
        {(idOfFilm || notification) && <div id="details" onDoubleClick={(evt) => { setIdOfFilm(null); setNotification(null) }}>
            {idOfFilm && < GetDetailsAboutFilm id={idOfFilm} />}
            {notification && <Notification notification={notification} />}
        </div>}
    </div>
}

export default SearchOnOMDb