const api_base = 'https://api.themoviedb.org/3'; 
const api_key_parameter = '?api_key=' + api_key;
const url_images = 'https://image.tmdb.org/t/p/original';
let data_api;

async function getTrendingsMovies(){
    const trendingContainer = document.querySelector('.trending-container');
    const res = await fetch(`${api_base}/trending/movie/day${api_key_parameter}`);
    const data = await res.json();

   data_api = data.results
   trendingContainer.innerHTML = '';
   data.results.forEach(movie => {
        trendingContainer.innerHTML += `<div class="movie-trending">
                                            <img class="movie-trending-image" src="${url_images}${movie.poster_path}" alt="${movie.title}"/>
                                            <span>${movie.title}</span>                                         
                                        </div>`;
   });
   setBannerMovie();
}

async function geCategoriesMovies(){
    const categoriesContainer = document.querySelector('.categories-container .categories-list');
    const res = await fetch(`${api_base}/genre/movie/list${api_key_parameter}`);
    const data = await res.json();

     //trendingContainer.innerHTML = '';
  data.genres.forEach(category => {
        categoriesContainer.innerHTML += `<button class="btn-dark ml mt" onclick="loadMoviesByCategory(${category.id})">${category.name}</button>`;
   });
}

async function loadMoviesByCategory(id){
    const moviesfilterContainer = document.querySelector('.categories-container .movies-filter');
    const res = await fetch(`${api_base}/genre/movie/list${api_key_parameter}`);
    const data = await res.json();

    
}

async function getUpcomingMovies(){
    const upcomingContainer = document.querySelector('.upcoming-container');
    const res = await fetch(`${api_base}/movie/upcoming${api_key_parameter}`);
    const data = await res.json();

   upcomingContainer.innerHTML = '';
   data.results.forEach(movie => {
        upcomingContainer.innerHTML += `<div class="movie-trending">
                                            <img class="movie-trending-image" src="${url_images}${movie.poster_path}" alt="${movie.title}"/>
                                            <span>${movie.title}</span>                                         
                                        </div>`;
   });
}

getTrendingsMovies()
getUpcomingMovies()
geCategoriesMovies()

function setBannerMovie(){
    bannerContainer.style.backgroundImage = `url("${url_images}${data_api[0].backdrop_path}")`;
    rate.innerText = data_api[0].vote_average;
    categories.innerHTML += `<span class="bg-primary">${data_api[0].media_type}</span>`;
    title.innerText = data_api[0].title;
    description.innerText = data_api[0].overview;
}
