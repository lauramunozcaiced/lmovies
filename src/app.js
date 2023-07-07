async function getTrendingsMovies(){
    const {data, status} = await api(`trending/movie/day`);
    trendingMoviesData = data.results;
    setContainerData(trendingMoviesContainer,data.results)
}


async function getTopRatedMovies(){
    const {data, status} = await api(`movie/top_rated`);
    topRatedMoviesData = data.results;
    setContainerData(topratedMoviesContainer,data.results)
}

async function getUpcomingMovies(){   
    const {data, status} = await api(`movie/upcoming`);
    upcomingMoviesData = data.results;
    setContainerData(upcomingMoviesContainer,data.results)
}


async function getCategories(){
    const {data,status} = await api(`genre/movie/list`);

    categoriesContainer.innerHTML = '';
  data.genres.forEach(category => {
    
        categoriesContainer.innerHTML += `<button class="btn-dark button-category ml mt ${(category == data.genres[0])? 'selected':''}" onclick="getMoviesByCategory(${category.id},this)">${category.name}</button>`;
   });
}

async function getMediaDetail(id){
    const {data,status} = await api(`movie/${id}`);

    detailsTitle.innerText = data.original_title;
    detailsTagline.innerText = data.tagline;
    detailsRate.innerText = data.vote_average;
    detailsCategories.innerHTML = '';
    data.genres.forEach(elem =>{
        detailsCategories.innerHTML += `<p>${elem.name}</p>`;
    })
    detailsDescription.innerText = data.overview;
    detailsImage.src = (data.poster_path)? url_images + data.poster_path: './assets/noimage.png';
    getRelatedMovies(id);
}

async function getRelatedMovies(id){
    const {data,status} = await api(`movie/${id}/similar`);
    setContainerData(similarContainer,data.results);
}

async function getMoviesByCategory(category,elem){
    if(elem){
        const buttonsCategory = document.querySelectorAll('.button-category');
        buttonsCategory.forEach(button => {
            button.classList.remove('selected')
        })
       elem.classList.add('selected');
       loadMoreMoviesCategory.setAttribute('category', category);
       page = 1;
    }
   
    const {data,status} = await api(`discover/movie`,{
        params:{
           with_genres: category
        }
    });
    page++;
    setContainerData(moviesByCategoryContainer,data.results)
    
}

async function getMoviesBySearch(){
    const {data,status} = await api(`search/movie`, {
        params: {
            query: searchField.value,
        }
    });
    setContainerData(searchMoviesContainer,data.results)
}

function getMoreMedia(){
    async function getMediaPerPage(route,container,clean = false,params){
        const {data,status} = await api.get(route,{
            params:{
                'page': page,
                ...params
        }});
        page += 1;
        allMoviesData = {...data.results};
        setContainerData(container, data.results, clean);
    }
    return getMediaPerPage;
}


const adderMovies = getMoreMedia();
const adderCategories = getMoreMedia();
loadMoreMoviesBtn.addEventListener('click', () => adderMovies('movie/popular',allMoviesContainer))
loadMoreMoviesCategory.addEventListener('click', () => adderCategories('discover/movie',moviesByCategoryContainer,false,{ with_genres: (loadMoreMoviesCategory.getAttribute('category') != null) ? loadMoreMoviesCategory.getAttribute('category'): '28'}))

async function getTrailerVideo(id, type= 'movie'){
    const {data, status} = await api(`${type}/${id}/videos`);

    if(data.results.length > 0){
        data.results.forEach(video => {
            watchTrailerBtn.classList.remove('disable');
            watchTrailerBtn.disabled = false;
            if(video.official == true){
                bannerVideoTrailer.src= `https://www.youtube.com/embed/${video.key}`;
            }
        })
    }else{
        watchTrailerBtn.classList.add('disable');
        watchTrailerBtn.disabled = true;
    }
 
}


async function setBanner(){
    const {data, status} = await api(`movie/popular`);
   let type;
   
   switch(getLanguage(language).name){
    case 'es' : type = 'película'; 
    break;
    case 'en' : type = 'movie';
    break
    case 'pr': type= 'filme';
    break
   }
   const bannerData = data.results[Math.floor(Math.random() * 5)];
   bannerMovieData = {...bannerData};
   getTrailerVideo(bannerData.id)

    bannerContainer.style.backgroundImage = `url("${url_images}${bannerData.backdrop_path}")`;
    rate.innerText = bannerData.vote_average;
    title.innerText =  bannerData.title;
    description.innerText = bannerData.overview;
    detailsBanner.setAttribute('data-movie',bannerData.id);
}

function setContainerData(container,data,clean = true,lazyload = true, noFounds = true){
   if(data.length == 0 && noFounds){
        container.innerHTML = '<p style="margin-top: 2rem">No results found.</p>';
        return;
    }
 
    
    if(clean){
        container.innerHTML = '';
    }    
              
    data.forEach(media => {
         const mediaContainer = document.createElement('div');
         mediaContainer.classList.add('media-card');
         mediaContainer.classList.add(`media-card-${media.id}`);
         mediaContainer.setAttribute('data-id',media.id);

        const mediaImg = document.createElement('div');
        mediaImg.classList.add('media-card-img');
        mediaImg.addEventListener("click", () => {callNavigatorForDetails(media.id)});
        (lazyload) ?
        mediaImg.setAttribute('data-bg', media.poster_path ? url_images + media.poster_path : './assets/noimage.png' ):
        mediaImg.style.backgroundImage = `url(${ media.poster_path ? url_images + media.poster_path : './assets/noimage.png'})`;

        const mediaText = document.createElement('p');
        mediaText.innerText = media.title;

        const mediaButton = document.createElement('button');
        mediaButton.classList.add('liked-button')
        if((likedMovieList()[media.id])) mediaButton.classList.add('liked');
        mediaButton.addEventListener("click", ()=> {
           mediaButton.classList.toggle('liked');
           toogleLikeMovie(media);
        })

        if(lazyload){
            lazyloader.observe(mediaImg);
        }

        mediaContainer.appendChild(mediaImg);
        mediaContainer.appendChild(mediaText);
        mediaContainer.appendChild(mediaButton);
        
        container.appendChild(mediaContainer);

    });
    
    
}

function likedMovieList(){
    const likedList = localStorage.getItem('liked_movies');
    return (likedList)? JSON.parse(likedList) : {};
}

function toogleLikeMovie(media){
    const likedList = likedMovieList();
    let shouldRemove = false;
    const mediasWithCode = document.querySelectorAll(`.media-card-${media.id} .liked-button`);
    console.log(mediasWithCode)
    if(likedList[media.id]){
        likedList[media.id] = undefined;  
        mediasWithCode.forEach(element => {
            element.classList.remove('liked');
        });
        shouldRemove = true;
    }else{
        likedList[media.id] = media;
        mediasWithCode.forEach(element => {
            element.classList.add('liked');
        });
  
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedList));
    (shouldRemove) ? document.querySelector(`.zone-favorites .media-card-${media.id}`).remove(): setContainerData(favoritesMoviesContainer, [media], false);
    toggleZoneFavorites();
   
}

