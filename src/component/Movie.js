import React from "react";
import { Link } from "react-router-dom";

import { useDecision } from "@optimizely/react-sdk";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie, movies }) => {
  const [styledTitleDecision] = useDecision(
    "styled_titles",
    { autoUpdate: true },
    {
      /* (Optional) User overrides */
    }
  );

  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <Link
      className={styledTitleDecision.enabled ? "movieTitle" : undefined}
      to={{
        pathname: `details/${movie.imdbID}`,
        query: { id: movie.imdbID, movies: movies },
      }}
    >
      <div className="movie">
        <h2>{movie.Title}</h2>
        <div>
          <img
            width="200"
            alt={`The movie titled: ${movie.Title}`}
            src={poster}
          />
        </div>
        <p>({movie.Year})</p>
      </div>
    </Link>
  );
};

export default Movie;
