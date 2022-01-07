import React, { useReducer, useEffect } from "react";

import Search from "./Search";
import Movie from "./Movie";

const defaultKeyword = 'see'
const MOVIE_API_URL = `https://www.omdbapi.com/?s=${defaultKeyword}&apikey=ab78a575`;


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const MoviesList = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    
    fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
    
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
      });
    });
}, []);

const search = searchValue => {
  dispatch({
    type: "SEARCH_MOVIES_REQUEST"
  });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=ab78a575`)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
      } else {
        dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
        });
      }
    });
};

const { movies, errorMessage, loading } = state;

return (<div>
  <Search search={search} />
 <div className="movies">
    {loading && !errorMessage ? (
      <span>loading... </span>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} movies ={movies}/>
      ))
    )}
    </div>
    </div>)
}

export default MoviesList;