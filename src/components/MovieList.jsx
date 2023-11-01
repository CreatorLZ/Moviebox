import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link , Navigate} from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css';
// import 'swiper/css';
const GridContainer = styled.div`
  display: flex;
`;
const Card = styled.div`
 text-align: left;
  box-sizing: border-box;
  gap: 16px;
  position: relative;
  img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  @media only screen and (max-width: 420px) {
  
   
  }
`;
const SvgContainer = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 20px;
  left: 188px;
  cursor: pointer;
  transition: fill 0.3s ease;

  &.change-fill {
    svg {
      fill: red;
    }
  }
`;
const Like = styled.img`
   @media only screen and (max-width: 420px) {
  
left:100px
}
`;
const Card2 = styled.div`
  display: flex;
`;

export const Ratings = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const MovieList = () => {
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [goToMovie, setGoToMovie] = useState(false);

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
  if (goToMovie){
    return <Navigate to ={`/movies/${movie.id}`} />
  }

  return (
    
    <Swiper
    spaceBetween={50}
    slidesPerView={3}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
      {movies.map((movie, index) => (
        <SwiperSlide
          data-testid="movie-card"
          key={movie.id}>
          <Link to={`/movies/${movie.id}`}> 
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Set the src attribute with the poster_path
              alt={movie.title}
              data-testid="movie-poster"
            />
             </Link>
            <Like
              style={{
                width: "50px",
                height: "50px",
                position: "absolute",
                top: "10px",
                left: "100px",
                cursor: "pointer",
                zIndex:"10",
                outline:"none",
                '@media only screen and (maxWidth: 420px)': {
                  left: "100px",
                  opacity: "0"
                }
              }}
              src={
    likedMovies[index]
      ? "images/liked.png"
      : "./images/Favorite.svg"
  }
  alt={movie.title}
  onClick={(event) => handleLikeClick(index, event)} />
         
         <div style={{ display: "flex", gap: "6px", paddingTop: "5px" }}>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}>
              USA,{" "}
            </p>
            <p
              data-testid="movie-release-date"
              style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}
            >
              {movie.release_date}
            </p>
          </div>
         
          <Card2>
            <p
              data-testid="movie-title"
              style={{ paddingTop: "8px", fontSize: "18px", fontWeight: "700" }}
            >
              {movie.title}
            </p>
          </Card2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "8px",
              fontSize: "12px",
              fontWeight: "400",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="./images/imdb.png"
                alt="imdb"
                style={{ marginRight: "10px", width: "35px", height: "17px" }}
              />
              <p style={{ marginRight: "30px" }}>{movie.vote_average} / 10.0</p>
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
          </div>
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
        </SwiperSlide>
      ))}
   </Swiper>
  );
};

export default MovieList;
