window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

searchField.addEventListener('keyup', function () {
    location.hash = 'search=' + this.value;
    searchTitle.innerText = this.value;
    navigator();
})

function callNavigatorForDetails(id) {
    location.hash = 'details=' + id;
}

function navigator() {
    const routes = {
        'movies': () => loadDataMoviesPage(),
        'categories': () => loadDataCategoriesPage(),
        'search': () => loadDataSearchPage(),
        'details': () => loadDataMovieDetailsPage(location.hash.replace('#details=', '')),
        'home': () => loadDataHomePage()
    }
    page = 1;
    window.scrollTo(0, 0);
    for (const route in routes) {
        if (location.hash.startsWith(`#${route}`)) {
            if (route == 'home') {
                loadDataHomePage();
                return;
            }
            routes[route]();
            showSection(route)

            return;
        }
        if (!location.hash.startsWith(`#search`)) {
            searchField.value = '';
        } else {
            if (searchField.value == '') {
                loadDataHomePage();
                return;
            }
        }
        if (!location.hash.startsWith(`#details`)) {
            detailsVideos.innerHTML = '';
        }
    }

    loadDataHomePage();

}

function showSection(nameSection) {
    sections.forEach(section => {
        section.classList.remove('show');
        section.classList.add('hide');
    })
    if (typeof nameSection != 'string') {
        nameSection.forEach(section => {
            const sectionChoose = document.getElementById(section);
            if (sectionChoose) {
                sectionChoose.classList.remove('hide');
                sectionChoose.classList.add('show');
            }
        })
    } else {
        const sectionChoose = document.getElementById(nameSection);
        if (sectionChoose) {
            sectionChoose.classList.remove('hide');
            sectionChoose.classList.add('show');
        }
    }
}

function toggleZoneFavorites() {
    const likedList = Object.values(likedMovieList());
    if (likedList.length > 0) {
        zoneFavorites.classList.remove('hidden');
    } else {
        zoneFavorites.classList.add('hidden');
    }
}


function loadDataHomePage() {
    if (ischangeLanguage) {
        setBanner()
        getTrendingsMovies();
        getTopRatedMovies();
        getUpcomingMovies();
    } else {
        (!bannerMovieData) ? setBanner() : false;
        (!trendingMoviesData) ? getTrendingsMovies() : (trendingMoviesData.length == 0) ? getTrendingsMovies() : false;
        (!topRatedMoviesData) ? getTopRatedMovies() : (topRatedMoviesData.length == 0) ? getTopRatedMovies() : false;
        (!upcomingMoviesData) ? getUpcomingMovies() : (upcomingMoviesData.length == 0) ? getUpcomingMovies() : false;
    }
    toggleZoneFavorites()
    setContainerData(favoritesMoviesContainer, Object.values(likedMovieList()), true, true, false);
    showSection(['home', 'banner']);
    ischangeLanguage = false;
}

function loadDataSearchPage() {
    getMoviesBySearch()
}

function loadDataMoviesPage() {
    (!allMoviesData) ? adderMovies('movie/popular', allMoviesContainer, true) : false;
}

function loadDataMovieDetailsPage(id) {
    detailsInfo.classList.remove('show');
    getMediaDetail(id);
    setTimeout(() => {
        detailsInfo.classList.add('show');
    }, 300);

}

function loadDataCategoriesPage() {
    (!categoriesData) ? getCategories() : false;
    getMoviesByCategory(28);
}

