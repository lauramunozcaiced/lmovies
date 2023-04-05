const api_base = 'https://api.themoviedb.org/3'; 
async function getTrendingsMovies(){
    const res = await fetch(`${api_base}/trending/all/day`,{
        headers:{
        
        }
    });
    const data = await res.json();

    console.log(data)
}

getTrendingsMovies()