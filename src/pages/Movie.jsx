import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import YouTube from "react-youtube";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from "react-slick";

const LOCAL_STORAGE_KEY = "movieData";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: hidden;
  background-color: whitesmoke;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background: #f8e7eb;
  @media only screen and (max-width: 420px) {
    margin-left: 0px;
    padding: 0px;
    width: 100vw;
  }
`;

const Promotion = styled.div`
  width: 170px;
  height: 200px;
  border-radius: 20px;
  border: 2px solid #be123c;
  background: #be123c1a;
  font-weight: 600;
  font-size: 15px;
  padding: 20px;
  gap: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    display: none;
  }
`;
const Poster = styled.div`
  width: 70%;
  height: 80vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  @media only screen and (max-width: 420px) {
    height: 40vh;
    width: 100%;
    margin-bottom: 0px;
  }
`;

const Moviedetails = styled.div`
  width: 744px;
  height: 100%;
  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;
const Moviedetailsright = styled.div`
  width: 350px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    display: none;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  z-index: 10;
  margin-bottom: 10px;
  p {
    font-size: 16px;
    font-weight: 600;
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
  }
`;
const Actors = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  gap: 5px;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    flex-wrap: wrap;
    display: flex;
    overflow-x: scroll;
    padding: 20px;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    display: none;
  }
`;
const Top2 = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 10px;
  padding: 5px 30px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0px;
  }
`;
const Top3 = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 5px 30px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0px;
    display: none;
  }
`;
const Top4 = styled.div`
  display: none;
  /* align-items: center; */
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 5px 30px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0px 10px;
    display: flex;
    margin-bottom: 0px;
  }
`;
const Genrecard = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px;
  border-radius: 15px;
  border: 1px solid #be123c;
  color: #be123c;
  font-size: 15px;
  font-weight: 700;
  line-height: 23px;
  cursor: pointer;
  @media only screen and (max-width: 420px) {
    font-size: 12px;
    flex-wrap: wrap;
    padding: 3px;
  }
`;
const Genrecard2 = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
  gap: 3px;
  @media only screen and (max-width: 420px) {
    display: none;
    gap: 3px;
  }
`;
const Genrecard3 = styled.div`
  display: none;
  align-items: center;
  width: fit-content;
  gap: 3px;
  @media only screen and (max-width: 420px) {
    display: flex;
    gap: 3px;
  }
`;
const Description = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  width: 744px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  display: none;
  @media only screen and (max-width: 420px) {
    width: 100%;
    display: flex;
    text-align: left;
    width: 100%;
    font-size: 12px;
    line-height: 30px;
  }
`;
const Description2 = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  width: 744px;
  height: auto;
  gap: 20px;
  display: flex;
  flex-direction: column;
  span {
    color: #be123c;
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
    margin-bottom: 20px;
    p {
      font-size: 16px;
    }
  }
`;
const Descbottom = styled.div`
  width: 90%;
  border-radius: 10px;
  border: 1px solid gray;
  height: 50px;
  display: flex;
  margin-top: 20px;
  @media only screen and (max-width: 420px) {
    width: 300px;
    flex-direction: column;
    height: fit-content;
    display: none;
    p:first-child {
      width: 100%;
    }
  }
`;
const Button1 = styled.div`
  width: 100%;
  padding: 20px;
  color: #ffffff;
  background: #be123c;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  gap: 5px;
  @media only screen and (max-width: 420px) {
    width: 80%;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
  }
`;
const Button2 = styled.div`
  background: #be123c1a;
  border: 1px solid #be123c;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  gap: 5px;
  @media only screen and (max-width: 420px) {
    width: 80%;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 400;
  }
`;
const Ads = styled.div`
  width: 100%;
  height: 229px;
  position: relative;
  img {
    width: 100%;
  }
  margin-top: 20px;
  @media only screen and (max-width: 420px) {
    width: 80%;
  }
`;
const Adbottom = styled.div`
  width: 100%;
  height: 42px;
  border-radius: 10px;
  position: absolute;
  bottom: 40px;
  background: #12121280;
  display: flex;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  gap: 5px;
  img {
    width: 23px;
    height: 23px;
  }
  font-size: 14px;
  @media only screen and (max-width: 420px) {
    bottom: 73px;
  }
`;
const Omega = styled.div`
  padding: 10px 30px;
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;
const MovieImg = styled.img`
  display: flex;
  @media only screen and (max-width: 420px) {
    display: none;
  }
`;
const MovieImg2 = styled.img`
  display: none;
  @media only screen and (max-width: 420px) {
    display: flex;
  }
`;
const ProductionLogo = styled.img`
  width: 50px;
  height: auto;
  object-fit: cover;
`;

const CastProfile = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  @media only screen and (max-width: 420px) {
    width: 100px;
    height: 100px;
  }
`;
const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; // gap between images
  overflow-x: auto;
  white-space: nowrap;
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    div {
      flex-direction: column;
    }
  }
`;

const Card = styled.div`
  /* box-sizing: border-box; */
  border: none;
  outline: none;
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
  .skeleton-wrapper {
    width: 270px;
    height: 100%;
    @media only screen and (max-width: 420px) {
      width: 160px;
    }
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
  background-color: #ebdede;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #da2f2f;
  }
  @media only screen and (max-width: 420px) {
    left: 110px;
  }
  img {
    object-fit: contain;
    width: 25px;
    height: 25px;
  }
`;
const Options = styled.div`
  width: 120px;
  height: fit-content;
  background-color: white;
  position: absolute;
  top: 50px;
  left: 140px;
  cursor: pointer;
  z-index: 10;
  border-radius: 5px;
  padding: 10px;
  @media only screen and (max-width: 420px) {
    left: 30px;
  }
  ul {
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
    li {
      display: flex;
      align-items: center;
      gap: 3px;
      border-bottom: 1px solid black;
      padding: 5px;
      &:hover {
        transform: scale(0.9);
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Movie = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [runtime, setRunTime] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [optionsVisibility, setOptionsVisibility] = useState([]);

  useEffect(() => {
    // Initialize optionsVisibility array with false values for each card
    setOptionsVisibility(Array(similarMovies.length).fill(false));
  }, [similarMovies]);
  const handleDotsClick = (index) => {
    // Toggle the visibility of the Options div for the specific card
    setOptionsVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const overviewWordsLimit = 40;
  // console.log(movieDetails)
  //function to convert runtime to hours and minutes
  function convertRuntimeToHoursAndMinutes(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours > 0) {
      if (minutes > 0) {
        return `${hours}h ${minutes}min`;
      } else {
        return `${hours}h`;
      }
    } else {
      return `${minutes}min`;
    }
  }
  // Async function to fetch director's information
  const getDirectorInfo = async (movieId) => {
    const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
        },
      });

      if (response.status === 200) {
        const directors = response.data.crew.filter(
          (member) => member.job === "Director"
        );
        if (directors.length > 0) {
          const director = directors[0];
          return {
            name: director.name,
            profilePath: director.profile_path,
          };
        }
      }
    } catch (error) {
      console.error("Error fetching director's information:", error);
    }

    return null;
  };

  // Async function to fetch writers' information
  const getWriterInfo = async (movieId) => {
    const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
        },
      });
      if (response.status === 200) {
        const writers = response.data.crew.filter(
          (member) => member.department === "Writing"
        );

        if (writers.length > 0) {
          const writerInfo = writers.map((writer) => ({
            name: writer.name,
            profilePath: writer.profile_path,
          }));
          return writerInfo;
        }
      }
    } catch (error) {
      console.error("Error fetching writers' information:", error);
    }

    return null;
  };

  // Function to fetch star information
  const getStarsInfo = async (movieId) => {
    try {
      const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
        },
      });
      if (response.status === 200) {
        const stars = response.data.cast.map((star) => ({
          name: star.name,
          profilePath: star.profile_path,
        }));
        // console.log(stars);
        return stars;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching stars data:", error);
      return null;
    }
  };
  // Define a function to fetch trailer data for a movie by its ID
  const getTrailerDataForMovie = async (movieId) => {
    try {
      const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
        },
      });

      if (response.status === 200) {
        const trailerKey = response.data.results[0].key;
        return trailerKey;
      } else {
        //  return null if no trailer is available
        return null;
      }
    } catch (error) {
      console.error("Error fetching trailer data:", error);
      return null; // Handle the error gracefully
    }
  };
  //fetch movie credits
  const fetchMovieCredits = async (movieId) => {
    try {
      const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
        },
      });

      if (response.status === 200) {
        // Set the fetched movie credits to the state
        // console.log(response.data);
        setMovieCredits(response.data);
      } else {
        // Handle error or return null if no credits are available
        setMovieCredits(null);
      }
    } catch (error) {
      console.error("Error fetching movie credits:", error);
      // Handle the error gracefully
      setMovieCredits(null);
    }
  };

  // Async function to fetch similar movies
  const fetchSimilarMovies = async (movieId) => {
    try {
      const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar`;

      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          language: "en-US",
          page: 1, // You can adjust the page if you want more results
        },
      });

      if (response.status === 200) {
        const similarMoviesData = response.data.results;
        console.log(response.data.results);
        setSimilarMovies(response.data.results);
      } else {
        setSimilarMovies([]);
      }
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      setSimilarMovies([]);
    }
  };

  useEffect(() => {
    // Fetch movie details using the movie ID from the URL
    const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;

    // Check if the data is already in localStorage
    const cachedMovieData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(cachedMovieData);

    if (cachedMovieData) {
      // If data is found in storage, set it to state
      setIsLoading(false); // Set loading to false since data is already available
    } else {
      // If data is not found in localstorage

      axios
        .get(apiUrl, {
          params: {
            api_key: apiKey,
            language: "en-US",
          },
        })
        .then(async (response) => {
          // Set the fetched movie details to the state
          setMovieDetails(response.data);
          await fetchSimilarMovies(id);
          console.log(similarMovies);

          // Convert release_date to UTC format
          const releaseDate = new Date(response.data.release_date);

          // Convert releaseDate back to UTC string without GMT time
          const releaseDateUTC = releaseDate.toISOString().split("T")[0];

          // Set the formatted release date to the state
          setReleaseDate(releaseDateUTC);

          // Fetch trailer data for the movie using the getTrailerDataForMovie function
          const trailerKey = await getTrailerDataForMovie(id);
          setTrailerKey(trailerKey);
          // Fetch movie credits using the fetchMovieCredits function
          await fetchMovieCredits(id);
          // Fetch director's information
          const directorInfo = await getDirectorInfo(id);
          // Set the director's information to state
          if (directorInfo) {
            setDirector(directorInfo.name);
            // You can set additional properties if needed, such as profile picture path
          } else {
            setDirector("Director information not found.");
          }

          // Fetch writers' information
          const writersInfo = await getWriterInfo(id);
          // Set the writers' information to state
          if (writersInfo) {
            setWriters(writersInfo);
            // console.log(writers);
            //  additional properties later, such as profile picture path
          } else {
            setWriters("Writers information not found.");
          }
          // Fetch stars' information
          const starsInfo = await getStarsInfo(id);
          if (starsInfo) {
            setStars(starsInfo);
          } else {
            setStars("Stars information not found.");
          }
          const runtimeInMinutes = response.data.runtime;
          const formattedRuntime =
            convertRuntimeToHoursAndMinutes(runtimeInMinutes);
          setRunTime(formattedRuntime);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    }
  }, [id]);

  if (!movieDetails) {
    // Render loading or error state while fetching data
    return <Spinner />;
  }
  // console.log(movieDetails);
  // const getGenresForMovie = (genreIds) => {
  //   return genreIds.map((genreId) => {
  //     const genre = genres.find((g) => g.id === genreId);
  //     return genre ? genre.name : "";
  //   });
  // };

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
    <Container>
      <Helmet>
        <title>{movieDetails.title} - Official trailer</title>
      </Helmet>
      {movieDetails ? (
        <Wrapper>
          <Navbar2 />

          <Top2>
            <MovieImg
              style={{ height: "80vh" }}
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} // Set the src attribute with the poster_path
              alt={movieDetails.title}
              data-testid="movie-poster"
            />
            <Poster>
              {trailerKey ? (
                <YouTube
                  videoId={trailerKey}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Spinner />
              )}
            </Poster>
            <Top4>
              <h3 data-testid="movie-title" style={{ marginRight: "10px" }}>
                {movieDetails.title}
              </h3>
              <p style={{ fontSize: "14px", fontWeight: "400" }}>
                {movieDetails.tagline}
              </p>
              <Genrecard3>
                {movieDetails.genres.map((genre) => (
                  <Genrecard key={genre.id}>{genre.name}</Genrecard>
                ))}
              </Genrecard3>
              <p
                data-testid="movie-release-date"
                style={{ marginRight: "20px" }}
              >
                Release date:{" "}
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {releaseDate}
                </span>
              </p>
              <p data-testid="movie-runtime">
                Runtime:{" "}
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {runtime}
                </span>
              </p>
            </Top4>
            <Moviedetailsright>
              <Details>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4 data-testid="movie-title" style={{ marginRight: "10px" }}>
                    {movieDetails.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      paddingBottom: "5px",
                    }}
                  >
                    {movieDetails.tagline}
                  </p>
                  <Genrecard2>
                    {movieDetails.genres.map((genre) => (
                      <Genrecard key={genre.id}>{genre.name}</Genrecard>
                    ))}
                  </Genrecard2>
                  <p
                    data-testid="movie-release-date"
                    style={{ marginRight: "20px" }}
                  >
                    Release date:{" "}
                    <span style={{ fontWeight: "normal" }}>{releaseDate}</span>
                  </p>
                  <p data-testid="movie-runtime">
                    Runtime:{" "}
                    <span style={{ fontWeight: "normal" }}>{runtime}</span>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 0px",
                      cursor: "pointer",
                      backgroundColor: "#be123c1a",
                    }}
                  >
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src="/images/add.png"
                      alt="add"
                    />
                    <p>Add to watchlist</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "20px",
                  }}
                >
                  {/* <img
                  style={{ width: "24px", height: "24px" }}
                  src="/images/save.png"
                  alt="heart"
                />
                <img src="/images/share2.png" alt="share" />
                <img src="/images/bookmark2.png" alt="save" /> */}
                  <p style={{ fontSize: "14px", fontWeight: "normal" }}>
                    {" "}
                    Added by 8.5K users
                  </p>
                </div>
                <Genrecard2>
                  {movieDetails.production_companies.map((company) =>
                    company.logo_path ? (
                      <ProductionLogo
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                        alt={company.name}
                        key={company.id}
                      />
                    ) : null
                  )}
                </Genrecard2>
                <h5 style={{ paddingTop: "5px" }}>Synopsis: </h5>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    lineHeight: "30px",
                  }}
                  data-testid="movie-overview"
                >
                  {showFullOverview
                    ? movieDetails.overview
                    : `${movieDetails.overview
                        .split(" ")
                        .slice(0, overviewWordsLimit)
                        .join(" ")}...`}
                  {!showFullOverview && (
                    <span
                      style={{
                        color: "#be123c",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => setShowFullOverview(true)}
                    >
                      Show more
                    </span>
                  )}
                  {showFullOverview && (
                    <span
                      style={{
                        color: "#be123c",
                        cursor: "pointer",
                        textDecoration: "underline",
                        zIndex: "10",
                      }}
                      onClick={() => setShowFullOverview(false)}
                    >
                      Show less
                    </span>
                  )}
                </p>
              </Details>
              {/* <Button1>
                {" "}
                <img src="/images/Two Tickets.png" alt="ticket" /> See Showtimes
              </Button1>
              <Button2>
                {" "}
                <img src="/images/List.png" alt="list" /> More watch options
              </Button2>
              <Ads>
                {" "}
                <img src="/images/Rectangle 37.png" alt="ad" />
                <Adbottom>
                  <img src="/images/List.png" alt="list2" />
                  <p>The Best Movies and Shows in September</p>
                </Adbottom>
              </Ads> */}
            </Moviedetailsright>
          </Top2>

          <Omega style={{ display: "flex", width: "100%" }}>
            <Moviedetails>
              <Top>
                <Genrecard2>
                  {movieDetails.genres.map((genre) => (
                    <Genrecard key={genre.id}>{genre.name}</Genrecard>
                  ))}
                </Genrecard2>
              </Top>
              {/* moviedetails for mobile below */}
              <Description>
                <MovieImg2
                  style={{ height: "40vh", paddingRight: "4px", width: "50%" }}
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} // Set the src attribute with the poster_path
                  alt={movieDetails.title}
                  data-testid="movie-poster"
                />

                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "30px",
                    width: "50%",
                  }}
                  data-testid="movie-overview"
                >
                  {showFullOverview
                    ? movieDetails.overview
                    : `${movieDetails.overview
                        .split(" ")
                        .slice(0, overviewWordsLimit)
                        .join(" ")}...`}
                  {!showFullOverview && (
                    <span
                      style={{
                        color: "#be123c",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => setShowFullOverview(true)}
                    >
                      Show more
                    </span>
                  )}
                  {showFullOverview && (
                    <span
                      style={{
                        color: "#be123c",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => setShowFullOverview(false)}
                    >
                      Show less
                    </span>
                  )}
                </p>
              </Description>
              <Description2>
                <p>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    Director:{" "}
                  </span>{" "}
                  <span>{director ? director : "Not Found"}</span>{" "}
                </p>
                {Array.isArray(writers) ? (
                  <div>
                    <p>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "black",
                        }}
                      >
                        Writers:{" "}
                      </span>
                      <span>
                        {writers.map((writer) => writer.name).join(", ")}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p>{writers}</p>
                )}
                {Array.isArray(stars) ? (
                  <div>
                    <p>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "black",
                        }}
                      >
                        Stars:{" "}
                      </span>
                      <span>
                        {stars
                          .slice(0, 4)
                          .map((star) => star.name)
                          .join(", ")}
                      </span>
                      {stars.length > 4 && " + more"}{" "}
                      {/* Add this line to indicate more stars */}
                    </p>
                  </div>
                ) : (
                  <span>No star information found for the movie.</span>
                )}
                <Genrecard3>
                  {movieDetails.production_companies.map((company) =>
                    company.logo_path ? (
                      <ProductionLogo
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                        alt={company.name}
                        key={company.id}
                      />
                    ) : null
                  )}
                </Genrecard3>
              </Description2>
              <Descbottom>
                <p
                  style={{
                    padding: "10px",
                    background: "#BE123C",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    borderRadius: "10px",
                    fontWeight: "normal",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30%",
                    marginRight: "20px",
                  }}
                >
                  Top rated movie #65
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Awards 9 nominations
                </p>
              </Descbottom>
            </Moviedetails>
          </Omega>
          <Actors style={{ background: "whitesmoke" }}>
            <h2
              style={{
                color: "#be123c",
                borderLeft: "5px solid #be123c",
                padding: "10px",
              }}
            >
              Top cast
            </h2>

            <CastGrid>
              {stars.map((actor) => (
                <div
                  key={actor.id}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <CastProfile
                    src={`https://image.tmdb.org/t/p/w500${actor.profilePath}`}
                    alt={actor.name}
                  />
                  <h6>{actor.name}</h6>
                </div>
              ))}
            </CastGrid>
          </Actors>
          <div style={{ padding: "20px" }}>
            <SkeletonTheme baseColor="#313131" highlightColor="#525252">
              <Slider {...settings}>
                {similarMovies.map((movie, index) => (
                  <Card data-testid="movie-card" key={movie.id}>
                    {similarMovies ? (
                      <>
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
                        <Dots onClick={() => handleDotsClick(index)}>
                          <img src="/images/dots.png" alt="dots" />
                        </Dots>
                        {/* Display the Options div only if isOptionsVisible is true */}
                        {optionsVisibility[index] && (
                          <Options>
                            <ul>
                              <li>
                                <img src="/images/Favorite.svg" alt="add" />
                                <p> Favourite</p>
                              </li>
                              <li>
                                <img src="/images/List.png" alt="list" />
                                <p> Watchlist</p>
                              </li>
                              <li>
                                <img src="/images/Star (1).png" alt="love" />
                                <p> Your rating</p>
                              </li>
                            </ul>
                          </Options>
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                            paddingTop: "5px",
                          }}
                        >
                          <p
                            data-testid="movie-release-date"
                            style={{
                              fontSize: "12px",
                              fontWeight: "700",
                              color: "gray",
                            }}
                          >
                            {movie.release_date}
                          </p>
                        </div>

                        <Card2>
                          <p data-testid="movie-title">{movie.title}</p>
                        </Card2>
                        <Div1>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src="/images/imdb.png"
                              alt="imdb"
                              style={{
                                marginRight: "10px",
                                width: "35px",
                                height: "17px",
                              }}
                            />
                            <p style={{ marginRight: "30px" }}>
                              {movie.vote_average}
                            </p>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src="/images/tomato.png"
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
                        {/* <p
              style={{
                paddingTop: "10px",
                fontSize: "12px",
                fontWeight: "400",
                color: "gray",
              }}
            >
              {getGenresForMovie(movie.genre_ids).join(", ")}
            </p>  */}
            <div style={{display:"flex", gap:"3px"}}>

                        
                          <p
                            style={{
                              paddingTop: "10px",
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                           
                          >
                           {movieDetails.genres.map((genre) => genre.name).join(", ")}
                          </p>
                        
            </div>
                      </>
                    ) : (
                      <div className="skeleton-wrapper">
                        <Skeleton height={200} count={1} />
                      </div>
                    )}
                  </Card>
                ))}
              </Slider>
            </SkeletonTheme>
          </div>
          <Footer />
        </Wrapper>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Movie;
