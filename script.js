let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = "3f2f1ce6";

// Function to fetch data from API

let getMovie = ()=>{
    let movieName = movieNameRef.value;
    console.log(movieName);
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // IF field is empty
    if(movieName.length<=0){
        result.innerHTML = `<h3 class="msg">Enter A Movie Name...</h3>`
    }
    else{
        fetch(url, 
            // `{referrerPolicy: "unsafe_url"}`
            )
        .then((res)=>res.json())
        .then((data) =>{
           // IF Movie exist in database
           if(data.Response == "True"){
            result.innerHTML = ` 
            <div class="info">
            <img src=${data.Poster} class="poster">
            <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                    <img src="star-icon.svg">
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast:</h3>
        <p>${data.Actors}</p>
        
    `;
      }
       // IF Movie doesn't exist in database
       else{
        result.innerHTML= `<h3 class="msg">${data.Error}</h3>`;
       }

        })
        // IF error occurs
        .catch(() =>{
            result.innerHTML = `<h3 class="msg">Error occured</h3>`;
        });
    }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load",getMovie);