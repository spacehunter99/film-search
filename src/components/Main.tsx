import React from 'react';

export default function Main() {

    interface dataInerface {
        posterUrl?: string,
        nameOriginal?: string,
        nameRu?: string,
        year?: string,
        slogan?: string,
        ratingKinopoisk?: string,
        filmLength?: string,
        description?: string,
        webUrl?: string
    }

    const [userInput, setUserInput] = React.useState<string>("")

    const [request, setRequest] = React.useState<string>("")

    const [filmId, setFilmId] = React.useState<string>("")

    const [allData, setAllData] = React.useState<dataInerface>({
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

    let url: string = encodeURIComponent(`${request}`);

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

   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInput(event.target.value)
   }

   function handleClick(event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setRequest(userInput)
   }

//    console.log(allData)

    return (
        <main className='container flex'>
            <form onSubmit={handleClick} className='request-container flex'>
                <input
                    type="text"
                    placeholder='?????????????? ??????????'
                    className='request-input'
                    value={userInput}
                    onChange={handleChange}
                />
                <button
                    className='request-button'
                    onClick={handleClick}
                >
                    ???????????? ??????????
                </button>
            </form>

            <div className='film-content-section container'>
                { request
                ? <div className='film-content grid'>
                    <img className='poster' src={allData.posterUrl}/>
                    <ul className='film-data'>
                        <li><span>???????????????????????? ????????????????</span>: {allData.nameOriginal ? allData.nameOriginal : allData.nameRu}</li>
                        <li><span>?????????????? ??????????????????????</span>: {allData.nameRu}</li>
                        <li><span>?????? ??????????????</span>: {allData.year}</li>
                        <li><span>????????????</span>: {allData.slogan}</li>
                        <li><span>?????????????? ????????????????????</span>: {allData.ratingKinopoisk}</li>
                        <li><span>????????????????????????</span>: {allData.filmLength} ??????????</li>
                    </ul>
                    <div className='description-and-button-section'>
                        <p className='description'><span>????????????????</span>: {allData.description}</p>
                        <button className='web-url'><a href={allData.webUrl}>???????????????? ???? ??????????????????</a></button>
                    </div>
                  </div>
                : <h1 className='header-without-request'>?????????????? ?????????? ??????????????!</h1>}
            </div>
        </main>
    )
}