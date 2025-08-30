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

const PopularList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [optionsVisibility, setOptionsVisibility] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoviesAndGenres = useCallback(async () => {
    try {
      const [moviesResponse, genresResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/movie/popular`, {
          params: { api_key: API_KEY, language: "en-US", page: 1 },
        }),
        axios.get(`${API_BASE_URL}/genre/movie/list`, {
          params: { api_key: API_KEY, language: "en-US" },
        }),
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
    setOptionsVisibility((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }, []);

  const getGenresForMovie = useCallback(
    (genreIds) => {
      return genreIds
        .map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean)
        .join(", ");
    },
    [genres]
  );

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 6,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      autoplay: true,
      autoplaySpeed: 6000,
      cssEase: "ease-in-out",
      centerMode: false,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 5, slidesToScroll: 1 },
        },
        {
          breakpoint: 1200,
          settings: { slidesToShow: 4, slidesToScroll: 1 },
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    []
  );

  const renderMovieCard = useCallback(
    (movie, index) => (
      <Card data-testid="movie-card" key={movie.id}>
        {!isLoading ? (
          <>
            <Link
              to={`/movies/${movie.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="poster-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  data-testid="movie-poster"
                />
                <div className="hover-overlay">
                  <div className="play-button"></div>
                </div>
              </div>
            </Link>

            <Dots onClick={(e) => handleDotsClick(index, e)}>
              <img src="./images/dots.png" alt="options" />
            </Dots>

            {optionsVisibility[index] && (
              <Options>
                <ul>
                  <li>
                    <img src="./images/Favorite.svg" alt="favorite" />
                    <p>Add to Favorites</p>
                  </li>
                  <li>
                    <img src="./images/List.png" alt="watchlist" />
                    <p>Add to Watchlist</p>
                  </li>
                  <li>
                    <img src="./images/Star (1).png" alt="rate" />
                    <p>Rate Movie</p>
                  </li>
                </ul>
              </Options>
            )}

            <div
              style={{
                paddingTop: "12px",
                fontSize: "11px",
                color: "#9ca3af",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {new Date(movie.release_date).getFullYear()}
            </div>

            <Card2>
              <p data-testid="movie-title">{movie.title}</p>
            </Card2>

            <Div1>
              <div>
                <img
                  src="./images/imdb.png"
                  alt="imdb"
                  style={{ width: "28px", height: "14px" }}
                />
                <p>{movie.vote_average.toFixed(1)}</p>
              </div>
              <div>
                <img
                  src="./images/tomato.png"
                  alt="rotten tomatoes"
                  style={{ width: "14px", height: "14px", objectFit: "cover" }}
                />
                <p>97%</p>
              </div>
            </Div1>

            <div
              style={{
                paddingTop: "6px",
                fontSize: "11px",
                color: "#6b7280",
                fontWeight: "500",
                width: "100%",
                lineHeight: "1.3",
              }}
            >
              {getGenresForMovie(movie.genre_ids)}
            </div>
          </>
        ) : (
          <div className="skeleton-wrapper">
            <Skeleton
              height="100%"
              style={{ borderRadius: "12px 12px 0 0", aspectRatio: "2/3" }}
            />
            <div style={{ padding: "12px 0" }}>
              <Skeleton height={18} style={{ marginBottom: "8px" }} />
              <Skeleton
                height={14}
                width="70%"
                style={{ marginBottom: "6px" }}
              />
              <Skeleton height={12} width="85%" />
            </div>
          </div>
        )}
      </Card>
    ),
    [isLoading, optionsVisibility, handleDotsClick, getGenresForMovie]
  );

  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div style={{ padding: "0 10px" }}>
        <Slider {...sliderSettings}>{movies.map(renderMovieCard)}</Slider>
      </div>
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
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: "10",
        right: "-24px",
        transition: "all 0.2s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
        e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
    />
  );
}

function SamplePrevArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(109, 107, 107, 0.2)",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: "10",
        left: "-24px",
        transition: "all 0.2s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
        e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
    />
  );
}

export default PopularList;
