//action type
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const SET_SHOW_FAVOURITE = 'SET_SHOW_FAVOURITE';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
//Action creators
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addFavourite(movie) {
    return {
        type: ADD_FAVOURITE,
        movie
    }
}

export function removeFavourite(movie) {
    return {
        type: REMOVE_FAVOURITE,
        movie
    }
}

export function setShowFavourite(val) {
    return {
        type: SET_SHOW_FAVOURITE,
        val
    }
}

export function addMovieToList(movie){
    return {
        type: ADD_MOVIE_TO_LIST, 
        movie
    }
}

export function handleMovieSearch(movie) {
    const url = `http://www.omdbapi.com/?apikey=d9d9c964&t=${movie}`;
    // console.log(url);

    return function (dispatch) {
        fetch(url)
        .then(response => response.json())
        .then(movie => {
        console.log("handleMovieSearch -> movie", movie)
             console.log('Movie : ', movie);
            dispatch(addMovieSearchResult(movie));
            //Dispatch an action with this movie
        });
    }
    
}

export function addMovieSearchResult (movie){
    return {
        type: ADD_SEARCH_RESULT,
        movie
    };
}