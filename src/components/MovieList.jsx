import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const GridContainer = styled.div`
  display: flex;
`;
const Card = styled.div`
  box-sizing: border-box;
  border: none;
  outline:none;
  width: 270px;
  height: 200px;
  text-align: left;
  gap: 16px;
  position: relative;
  :focus {
    outline: none;
    border: none;
  }
  img {
    width: 270px;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  @media only screen and (max-width: 420px) {
    width: 170px;
    height: 200px;
    img {
      width: 170px;
      height: 100%;
      object-fit: cover;
    }
    :focus {
      outline: none;
    }
  }
  @media only screen and (max-width: 385px) {
    width: 152px;
    height: 200px;
    img {
      width: 152px;
      height: 100%;
      object-fit: cover;
    }
    :focus {
      outline: none;
    }
  }
`;

const Like = styled.img`
  @media only screen and (max-width: 420px) {
    left: 100px;
  }
`;
const Card2 = styled.div`
  display: flex;
  width: 80%;

  padding-top: 8px;
  font-size: 18px;
  font-weight: 700;
  @media only screen and (max-width: 420px) {
    font-size: 12px;
  }
`;

export const Ratings = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Div1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding-top: 8px;
  font-size: 12px;
  font-weight: 400;
  @media only screen and (max-width: 420px) {
    width: 50%;
  }
`;
const Dots = styled.div`
    width: 35px;
    height: 35px;
    position: absolute;
    object-fit: cover;
    top: 10px;
    left: 220px;
    cursor: pointer;
    z-index: 10;
    outline: none;
    background-color:#ebdede ;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      background-color:#da2f2f;
    }
    @media only screen and (max-width: 420px) {
    left: 110px;
  }
    img{
      object-fit: contain;
      width: 25px;
      height: 25px;
      
    }

`
const Options = styled.div`
  width: 120px;
  height: fit-content;
  background-color: white;
  position: absolute;
  top: 50px;
  left: 140px;
  cursor: pointer;
  z-index: 10;
  border-radius:5px;
  padding: 10px;
  @media only screen and (max-width: 420px) {
    left: 30px;
  }
ul{
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  li{
    display: flex;
    align-items: center;
    gap: 3px;
    border-bottom:1px solid black;
    padding: 5px;
    &:hover{
      transform: scale(0.9);
    }
    img{
      width: 20px;
      height: 20px;
    }
  }
}
`
const MovieList = () => {
  const apiUrl = "https://api.themoviedb.org/3/trending/movie/week";
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [goToMovie, setGoToMovie] = useState(false);
  const [optionsVisibility, setOptionsVisibility] = useState([]);


  useEffect(() => {
    // Initialize optionsVisibility array with false values for each card
    setOptionsVisibility(Array(movies.length).fill(false));
  }, [movies]);
  const handleDotsClick = (index) => {
    // Toggle the visibility of the Options div for the specific card
    setOptionsVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };
  const handleLikeClick = (index) => {
    // Prevent the click event from propagating to the parent link
    event.stopPropagation();
    setLikedMovies((prevLikedMovies) => {
      const updatedLikedMovies = [...prevLikedMovies];
      updatedLikedMovies[index] = !updatedLikedMovies[index];
      return updatedLikedMovies;
    });
  };

  useEffect(() => {
    // The Fetch top movies
    axios
      .get(apiUrl, {
        params: {
          api_key: apiKey,
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        const topMovies = response.data.results.slice(0, 10);
        setMovies(topMovies);
        // Initialize likedMovies with all values set to false
        setLikedMovies(Array(topMovies.length).fill(false));

        // Fetch genres
        axios
          .get("https://api.themoviedb.org/3/genre/movie/list", {
            params: {
              api_key: apiKey,
              language: "en-US",
            },
          })
          .then((genreResponse) => {
            setGenres(genreResponse.data.genres);
          })
          .catch((genreError) => {
            console.error("Error fetching genre data:", genreError);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getGenresForMovie = (genreIds) => {
    return genreIds.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : "";
    });
  };
  if (goToMovie) {
    return <Navigate to={`/movies/${movie.id}`} />;
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
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

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
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

  const settings = {
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
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <Card data-testid="movie-card" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Set the src attribute with the poster_path
                alt={movie.title}
                data-testid="movie-poster"
              />
            </Link>
            {/* <Like
              style={{
                width: "50px",
                display:"none",
                height: "50px",
                position: "absolute",
                top: "10px",
                left: "100px",
                cursor: "pointer",
                zIndex: "10",
                outline: "none",
                "@media only screen and (maxWidth: 420px)": {
                  left: "100px",
                  opacity: "0",
                },
              }}
              src={
                likedMovies[index]
                  ? "images/liked.png"
                  : "./images/Favorite.svg"
              }
              alt={movie.title}
              onClick={(event) => handleLikeClick(index, event)}
            /> */}
            <Dots  onClick={() => handleDotsClick(index)}><img src="./images/dots.png" alt="dots" /></Dots>
             {/* Display the Options div only if isOptionsVisible is true */}
             {optionsVisibility[index] &&  (
              <Options>
               <ul>
                <li><img src="./images/Favorite.svg" alt="add" /><p> Favourite</p></li>
                <li><img src="./images/List.png" alt="list" /><p> Watchlist</p></li>
                <li><img src="./images/Star (1).png" alt="love" /><p> Your rating</p></li>
               </ul>
              </Options>
            )}

            <div style={{ display: "flex", gap: "6px", paddingTop: "5px" }}>
              
              <p
                data-testid="movie-release-date"
                style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}
              >
                {movie.release_date}
              </p>
            </div>

            <Card2>
              <p data-testid="movie-title">{movie.title}</p>
            </Card2>
            <Div1>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="./images/imdb.png"
                  alt="imdb"
                  style={{ marginRight: "10px", width: "35px", height: "17px" }}
                />
                <p style={{ marginRight: "30px" }}>{movie.vote_average}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="./images/tomato.png"
                  alt="tomato"
                  style={{
                    marginRight: "10px",
                    width: "16px",
                    height: "17px",
                    objectFit: "cover",
                  }}
                />
                <p>97%</p>
              </div>
            </Div1>
            <p
              style={{
                paddingTop: "10px",
                fontSize: "12px",
                fontWeight: "400",
                color: "gray",
              }}
            >
              {getGenresForMovie(movie.genre_ids).join(", ")}
            </p>
          </Card>
        )) || <Skeleton/>}
      </Slider>
    </>
  );
};

export default MovieList;
