import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import YouTube from "react-youtube";
import { Helmet } from "react-helmet";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from "react-slick";
import {
  Actors,
  Card,
  Card2,
  CastGrid,
  CastProfile,
  Container,
  Descbottom,
  Description,
  Description2,
  Details,
  Div1,
  Dots,
  Genrecard,
  Genrecard2,
  Genrecard3,
  MovieImg,
  MovieImg2,
  Moviedetails,
  Moviedetailsright,
  Omega,
  Options,
  Poster,
  ProductionLogo,
  Top,
  Top2,
  Top4,
  Wrapper,
} from "../components/Moviepagestyles";

const LOCAL_STORAGE_KEY = "movieData";

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


  // Toggle the visibility of the Options div for the specific card
  const handleDotsClick = (index) => {
    setOptionsVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const overviewWordsLimit = 40;

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
        // console.log(response.data.results);
        const similarMovies = response.data.results.slice(0, 10);
        setSimilarMovies(similarMovies);
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
            append_to_response: "credits",
          },
        })
        .then(async (response) => {
          // Set the fetched movie details to the statez
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
        
          // Fetch director's information
          const directorInfo = await getDirectorInfo(id);
          // Set the director's information to state
          if (directorInfo) {
            setDirector(directorInfo.name);
            // I can set additional properties if needed, such as profile picture path
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
          // const starsInfo = movieDetails.credits.cast;
          console.log(starsInfo);
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
    pauseOnHover: true,
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
            {trailerKey ? (
              <Poster>
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
              </Poster>
            ) : (
              <Spinner />
            )}
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
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} 
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
                  key={actor.name}
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
            <h2
              style={{
                color: "#be123c",
                borderLeft: "5px solid #be123c",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              Similar Movies
            </h2>
            <SkeletonTheme baseColor="#313131" highlightColor="#525252">
              <Slider {...settings}>
                {similarMovies.map((movie, index) => (
                  <Card data-testid="movie-card" key={movie.id}>
                    {similarMovies ? (
                      <>
                        <Link to={`/movies/${movie.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            data-testid="movie-poster"
                          />
                        </Link>
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

                        <div style={{ display: "flex", gap: "3px" }}>
                          <p
                            style={{
                              paddingTop: "10px",
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            {movieDetails.genres
                              .map((genre) => genre.name)
                              .join(", ")}
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
