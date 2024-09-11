import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Card2, Div1, Dots, Options } from "./Moviestyles";

const API_KEY = "14526ed9b5bfe3871ae714ee0a0c7f07";
const API_BASE_URL = "https://api.themoviedb.org/3";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [optionsVisibility, setOptionsVisibility] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoviesAndGenres = useCallback(async () => {
    try {
      const [moviesResponse, genresResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/trending/movie/week`, {
          params: { api_key: API_KEY, language: "en-US", page: 1 }
        }),
        axios.get(`${API_BASE_URL}/genre/movie/list`, {
          params: { api_key: API_KEY, language: "en-US" }
        })
      ]);

      const topMovies = moviesResponse.data.results.slice(0, 10);
      setMovies(topMovies);
      setGenres(genresResponse.data.genres);
      setOptionsVisibility(Array(topMovies.length).fill(false));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesAndGenres();
  }, [fetchMoviesAndGenres]);

  const handleDotsClick = useCallback((index) => {
    setOptionsVisibility(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }, []);

  const getGenresForMovie = useCallback((genreIds) => {
    return genreIds.map(id => genres.find(g => g.id === id)?.name).filter(Boolean).join(", ");
  }, [genres]);

  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      }
    ]
  }), []);

  const renderMovieCard = useCallback((movie, index) => (
    <Card data-testid="movie-card" key={movie.id}>
      {!isLoading ? (
        <>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              data-testid="movie-poster"
            />
          </Link>
          <Dots onClick={() => handleDotsClick(index)}>
            <img src="./images/dots.png" alt="dots" />
          </Dots>
          {optionsVisibility[index] && (
            <Options>
              <ul>
                <li><img src="./images/Favorite.svg" alt="add" /><p>Favourite</p></li>
                <li><img src="./images/List.png" alt="list" /><p>Watchlist</p></li>
                <li><img src="./images/Star (1).png" alt="love" /><p>Your rating</p></li>
              </ul>
            </Options>
          )}
          <div style={{ display: "flex", gap: "6px", paddingTop: "5px" }}>
            <p data-testid="movie-release-date" style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}>
              {movie.release_date}
            </p>
          </div>
          <Card2>
            <p data-testid="movie-title">{movie.title}</p>
          </Card2>
          <Div1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="./images/imdb.png" alt="imdb" style={{ marginRight: "10px", width: "35px", height: "17px" }} />
              <p style={{ marginRight: "30px" }}>{movie.vote_average}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="./images/tomato.png" alt="tomato" style={{ marginRight: "10px", width: "16px", height: "17px", objectFit: "cover" }} />
              <p>97%</p>
            </div>
          </Div1>
          <p style={{ paddingTop: "10px", fontSize: "12px", fontWeight: "400", color: "gray" }}>
            {getGenresForMovie(movie.genre_ids)}
          </p>
        </>
      ) : (
        <div className="skeleton-wrapper">
          <Skeleton height={200} count={1} />
        </div>
      )}
    </Card>
  ), [isLoading, optionsVisibility, handleDotsClick, getGenresForMovie]);

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Slider {...sliderSettings}>
        {movies.map(renderMovieCard)}
      </Slider>
    </SkeletonTheme>
  );
};

function SampleNextArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(109, 107, 107, 0.2)",
        width: "50px",
        height: "70px",
        zIndex: "10",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(109, 107, 107, 0.2)",
        width: "50px",
        height: "70px",
        zIndex: "10",
      }}
      onClick={onClick}
    />
  );
}

export default MovieList;