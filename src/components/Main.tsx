import React from 'react';

export default function Main() {

    const [userInput, setUserInput] = React.useState("")

    const [request, setRequest] = React.useState("")

    const [filmId, setFilmId] = React.useState("")

    const [allData, setAllData] = React.useState({
        posterUrl: "",
        nameOriginal: "",
        nameRu: "",
        year: "",
        slogan: "",
        ratingKinopoisk: "",
        filmLength: "",
        description: "",
        webUrl: ""
    })

    let url = encodeURIComponent(`${request}`);

    React.useEffect(() => {
        fetch(`//kinopoiskapiunofficial.tech/api/v2.2/films?keyword=${url}&page=1`, {
            method: 'GET',
            headers: {
            'X-API-KEY': '9f0c8cdd-e6ce-4564-859f-02a2e719e43c',
            'Content-Type': 'application/json',
            },
        }) 
            .then(result => result.json())
            .then(response => setFilmId(response.items[0].kinopoiskId))
        
        fetch(`//kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
            method: 'GET',
            headers: {
            'X-API-KEY': '9f0c8cdd-e6ce-4564-859f-02a2e719e43c',
            'Content-Type': 'application/json',
            },
        }) 
            .then(result => result.json())
            .then(response => setAllData(prevState => {
                return {
                    ...prevState,
                    posterUrl: response.posterUrl,
                    nameOriginal: response.nameOriginal,
                    nameRu: response.nameRu,
                    year: response.year,
                    slogan: response.slogan,
                    ratingKinopoisk: response.ratingKinopoisk,
                    filmLength: response.filmLength,
                    description: response.description,
                    webUrl: response.webUrl
                }
            }))
    }, [url, filmId])

   function handleChange(event: any) {
        setUserInput(event.target.value)
   }

   function handleClick(event: any) {
        event.preventDefault()
        setRequest(userInput)
   }

   console.log(allData)

    return (
        <main className='container flex'>
            <form onSubmit={handleClick} className='request-container flex'>
                <input
                    type="text"
                    placeholder='Введите фильм'
                    className='request-input'
                    value={userInput}
                    onChange={handleChange}
                />
                <button
                    className='request-button'
                    onClick={handleClick}
                >
                    Начать поиск
                </button>
            </form>
            <div className='film-content-section container'>
                { request
                ? <div className='film-content grid'>
                    <img className='poster' src={allData.posterUrl}/>
                    <ul className='film-data'>
                        <li><span>Оригинальное название</span>: {allData.nameOriginal ? allData.nameOriginal : allData.nameRu}</li>
                        <li><span>Русская локализация</span>: {allData.nameRu}</li>
                        <li><span>Год выпуска</span>: {allData.year}</li>
                        <li><span>Слоган</span>: {allData.slogan}</li>
                        <li><span>Рейтинг кинопоиска</span>: {allData.ratingKinopoisk}</li>
                        <li><span>Длительность</span>: {allData.filmLength} минут</li>
                    </ul>
                    <div className='description-and-button-section'>
                        <p className='description'><span>Описание</span>: {allData.description}</p>
                        <button className='web-url'><a href={allData.webUrl}>Смотреть на Кинопоиск</a></button>
                    </div>
                  </div>
                : <h1 className='header-without-request'>Начните поиск фильмов!</h1>}
            </div>
        </main>
    )
}