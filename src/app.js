const api_base = 'https://api.themoviedb.org/3'; 
async function getTrendingsMovies(){
    const res = await fetch(`${api_base}/trending/all/day`,{
        headers:{
            'X-API-KEY': 'b568ef4492c03e7fca59d1c715a579bb',
        }
    });
    const data = await res.json();

    console.log(data)
}

getTrendingsMovies()