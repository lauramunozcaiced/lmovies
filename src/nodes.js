/* Banner Section container */
const bannerContainer = document.querySelector('.banner-container')
const rate =  document.querySelector('.banner-container .banner-movie-info .rate');
const categories =  document.querySelector('.banner-container .banner-movie-info .categories');
const title =  document.querySelector('.banner-container .banner-movie-info .title');
const description =  document.querySelector('.banner-container .banner-movie-info .description');

const sections = document.querySelectorAll('section');

/* Home sections containers */
const favoritesMoviesContainer = document.querySelector('.favorites-movies-container');
const zoneFavorites = document.querySelector('.zone-favorites');
const trendingMoviesContainer = document.querySelector('.trending-movies-container');
const topratedMoviesContainer = document.querySelector('.toprated-movies-container');
const upcomingMoviesContainer = document.querySelector('.upcoming-movies-container');

const trendingSeriesContainer = document.querySelector('.trending-series-container');
const topratedSeriesContainer = document.querySelector('.toprated-series-container');
const upcomingSeriesContainer = document.querySelector('.upcoming-series-container');

/* Search Movies container*/
const searchMoviesContainer = document.querySelector('.search-movies-container')

/* Movies section container */
const allMoviesContainer = document.querySelector('.all-movies-container');

/* Series section container */
const allSeriesContainer = document.querySelector('.all-series-container');

/*Categories sections containers */
const categoriesContainer = document.querySelector('.categories-container .categories-list');
const moviesByCategoryContainer = document.querySelector('.categories-container .movies-filter');

/*Button Load More Movies */
const loadMoreMoviesBtn = document.getElementById('load-more-movies');
const loadMoreSeriesBtn = document.getElementById('load-more-series');
const loadMoreMoviesCategory = document.getElementById('load-more-movies-by-category');


const bannerVideoTrailer = document.querySelector('#videoplayer');
const detailsBanner = document.querySelector('#details-banner');

const watchTrailerBtn = document.getElementById('watch-trailer')
const modalVideoTrailer = document.querySelector('.trailer-video-container')
const modalCloseBtn = document.querySelector('.trailer-video-container .close');
const iframeVideoTrailer = document.querySelector('.trailer-video-container iframe');

const searchField = document.getElementById('search-field');
const searchTitle = document.querySelector('.search h2 b');

const header = document.querySelector('header');

/* Details Section Container */
const buttonsDetails = document.querySelectorAll('.details-view');

const detailsTitle = document.querySelector('#details .details-movie-info .title');
const detailsTagline = document.querySelector('#details .details-movie-info .tagline');
const detailsRate = document.querySelector('#details .details-movie-info .rate');
const detailsCategories = document.querySelector('#details .details-movie-info .categories-movie');
const detailsDescription = document.querySelector('#details .details-movie-info .description');
const detailsImage = document.querySelector('#details .details-movie-info .image img');

const similarContainer = document.querySelector("#details .similar-container");

/*Loader */

const loadingContainers = document.querySelectorAll('.loading-container');
const loadingElements = document.querySelectorAll('.loading');

/* Like button */
const likedButtons = document.querySelectorAll('.liked-button');

/* Language*/
const languageElements = document.querySelectorAll('.language');
const languageSelector = document.querySelector('#languageSelector');

/*Expandable */
const expandableBtn = document.getElementById('expandableBtn');
const expandableMenu = document.getElementById('expandableMenu');