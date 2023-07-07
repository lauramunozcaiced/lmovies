
let language;
let ischangeLanguage = false;
if(localStorage.getItem('language')){
    if(localStorage.getItem('language') == '[object Object]'){
        localStorage.removeItem('language')
    }else{
        language = localStorage.getItem('language')
    }
  }else{
    language =  navigator.language;
    localStorage.setItem('language',language)
  }


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': api_key,
        'language': getLanguage(language).api
    }
});


const url_images = 'https://image.tmdb.org/t/p/original';

const lazyloader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-bg');
            entry.target.style.backgroundImage = `url(${url})`;
        }       
    })
})


let bannerMovieData, trendingMoviesData, 
topRatedMoviesData, upcomingMoviesData, allMoviesData, 
categoriesData;

function getLanguage(lang){
    const languagesArray = [{name: 'en', api: 'en-US'},{name:'es', api: 'es-ES'},{name: 'pr', api: 'pt-BR'}];
    let languageToSend;
    languagesArray.forEach(language =>{
            if(lang.includes(language.name)){
               languageToSend = language
            }
    })  
    return  languageToSend;  
}