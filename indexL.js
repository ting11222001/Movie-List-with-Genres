(function () {
  // access movie index api
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataGenre = []
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  const dataPanel = document.getElementById('data-panel')
  const genreList = document.querySelector('#genre-list')

  displayGenreList(genres)

  //get movies from API; "data" becomes array of object (each object is a movie)
  axios
    .get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      displayDataList(data)
    })
    .catch((err) => console.log(err))

  genreList.addEventListener('click', event => {
    // console.log('click')
    // console.log(event.target)
    let genreID = event.target.dataset.id
    // console.log(genreID)

    //can print out corectly after clicking the first genre
    //but don't know how to clean the previous genres when moving on the next genre
    data.forEach(function (item, index) {
      if (item.genres.includes(Number(genreID))) {
        console.log(item)
        dataGenre.push(item)
      }
    })
    displayDataList(dataGenre)
  })

  //display movies one by one; add labels name
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="card mb-2 col-sm-3">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title">${item.title}</h5>
              ${item.genres.map(item => `<span class="badge badge-light">${genres[item]}</span>`).join(' ')}
            </div>
        </div>
     `
      dataPanel.innerHTML = htmlContent
    })
  }

  //mapping genre list
  function displayGenreList(genres) {
    let navHtml = ''
    for (let genre in genres) {
      navHtml += `
      <li class="nav-item">
        <a class="nav-link" href="#" data-id="${genre}">${genres[genre]}</a>
      </li>`
    }
    genreList.innerHTML = navHtml
  }
})()