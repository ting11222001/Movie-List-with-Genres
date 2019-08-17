(function () {
  //access movie index api
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  //create a container for API data
  const data = []
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

  //display movies one by one; add labels name
  function displayDataList(data) {
    let htmlContent = ''
    //forEach 是這幾個陣列函式最單純的一個，不會額外回傳值，只單純執行每個陣列內的物件或值。
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
    //create a container for data with right labels
    let dataGenre = []
    //filter() 會回傳一個陣列，其條件是 return 後方為 true 的物件
    dataGenre = data.filter(item => item.genres.includes(Number(genreID)))
    displayDataList(dataGenre)
  })
})()