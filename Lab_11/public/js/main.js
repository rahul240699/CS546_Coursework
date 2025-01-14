/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page. You can use a client-side fetch or axios request instead of AJAX)
*/
$(document).ready(function() {
    let searchMovieForm = $('#searchMovieForm');
    let searchResults = $('#searchResults');

    let rootLink = $('#rootLink');

    let movieDetails = $('#movieDetails');

    searchMovieForm.submit(function(event) {
        event.preventDefault();

        let movie_search_term  = $('#movie_search_term').val().trim();

        if(!movie_search_term){
            alert("Please Enter a term for searching the movie.");
            return;
        }

        const reqConf = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: {
                apikey: '',
                s: movie_search_term
            }
        };

        const reqConfPage2 = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: {
                apikey: '',
                s: movie_search_term,
                page:2
            }
        };

        movieDetails.hide();
        searchResults.empty();
        searchMovieForm.hide();
        rootLink.show();

        $.ajax(reqConf).then(function(response) {
            if (response && response.Search) {
                response.Search.forEach(function (movie){
                    let movies = $('<li><a href="javascript:void(0)" data-id="' + movie.imdbID + '">' + movie.Title + '</a></li>');
                    searchResults.append(movies);
                });
                
            } 
        }).catch(function(error) {
            searchResults.append('<p>Error fetching movies.</p>');
            searchResults.show();
        });

    $.ajax(reqConfPage2).then(function(response) {
            if (response && response.Search) {
                response.Search.forEach(function (movie){
                    let movies = $('<li><a href="javascript:void(0)" data-id="' + movie.imdbID + '">' + movie.Title + '</a></li>');
                    searchResults.append(movies);
                });
                searchResults.show();
            }else{
                searchResults.append('<p>No Movies found</p>');
                searchResults.show();
            } 
        });
    });

    

    searchResults.on('click', 'li', function(event) {
        event.preventDefault();
        let id = $(this).find('a').data('id');

        const reqConfId = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: {
                apikey: '',
                i: id
            }
        };

        movieDetails.empty();
        searchResults.hide();

        $.ajax(reqConfId).then(function(response){
            if(response){
                let info = response;
                let ratings = '';
                info.Ratings.forEach(rating => {
                    ratings += `
                        <tr>
                            <td>${rating.Source}</td>
                            <td>${rating.Value}</td>
                        </tr>
                    `;
                });
                console.log(info.Poster);
                let poster = info.Poster && info.Poster !== "N/A" ? info.Poster : '/public/css/no_image.png';

                movieDetails.append(
                    `<article>
                <h1>${info.Title}</h1>
                  <img alt="${info.Title}" src= ${poster}>
                
                  <h2>Plot</h2>
                  <p>${info.Plot}</p>
                  <section>
                    <h3>Info</h3>
                    <dl>
                      <dt>Year Released:</dt>
                        <dd>${info.Year}</dd>
                      <dt>Rated:</dt>
                        <dd>${info.Rated}</dd>
                      <dt>Runtime:</dt>
                        <dd>${info.Runtime}</dd>
                      <dt>Genre(s):</dt>
                        <dd>${info.Genre}</dd>
                      <dt>Box Office Earnings:</dt>
                        <dd>${info.BoxOffice}</dd>
                      <dt>DVD Release Date:</dt>
                        <dd>${info.DVD}</dd>
                    </dl>
                  </section>
                
                  <section>
                    <h4>Cast and Crew</h4>
                    <p><strong>Director:</strong>${info.Director} </p>
                    <p><strong>Writer:</strong>${info.Writer} </p>
                    <p><strong>Cast:</strong>${info.Actors} </p>
                  </section>
                  
                  <section>
                    <h4>Ratings</h4>
                    <table class="my_coolratings_table">
                      <tr>
                        <th>Source</th>
                        <th>Rating</th>
                     </tr>
                     
                    ${ratings}
                    
                  </table>
                </section>
                
            </article>`
            )

            movieDetails.show();
            
            }else{
                movieDetails.append('<p>No Movies found</p>');
                movieDetails.show();
            }
        })
    });

});
