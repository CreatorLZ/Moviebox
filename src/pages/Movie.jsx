import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import YouTube from "react-youtube";

const LOCAL_STORAGE_KEY = "movieData";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: hidden;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100vh;
  background: #ffffff;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid gray;
  @media only screen and (max-width: 420px) {
    width: 15%;
    border-radius: 0px;
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  font-weight: normal;
  img {
    margin: 20px;
    border: 50%;
    object-fit: cover;
  }
  @media only screen and (max-width: 420px) {
    img {
      padding: 5px;
    }
    h4 {
      display: none;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background: #ffffff;
  padding: 20px;
  margin-left: 20%;
  @media only screen and (max-width: 420px) {
    margin-left: 0px;
    padding: 0px;
    width: 100vw;
  }
`;

const Navcontent = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 60px;
  width: 100%;
  height: 66px;
  font-weight: 600;
  font-size: 20px;

  &:hover {
    background: #be123c1a;
    border-right: 2px solid #be123c;
    cursor: pointer;
  }
  img {
    padding-right: 20px;
  }
  @media only screen and (max-width: 420px) {
    p {
      display: none;
    }
    justify-content: center;
    &:hover {
      background: transparent;
      border-right: none;
      cursor: pointer;
    }
    img {
      padding-right: 0;
      :hover {
        transform: scale(1.1);
      }
    }
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
  width: 100%;
  height: 55vh;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  @media only screen and (max-width: 420px) {
    height: 30vh;
    width: 100%;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 420px) {
    width: 100%;
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
  }
`;
const Genrecard = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px;
  border-radius: 15px;
  border: 1px solid #f8e7eb;
  color: #be123c;
  font-size: 15px;
  font-weight: 700;
  line-height: 23px;
  @media only screen and (max-width: 420px) {
    font-size: 12px;
    flex-wrap: wrap;
    padding: 0px;
  }
`;
const Description = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  width: 744px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  @media only screen and (max-width: 420px) {
    width: 100%;
    text-align: left;
    width: 100%;
    font-size: 12px;
    line-height: 30px;
  }
`;
const Description2 = styled.div`
  font-size: 20px;
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
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
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
        console.log(response.data);
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

  useEffect(() => {
    // Fetch movie details using the movie ID from the URL
    const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;

    // Check if the data is already in localStorage
    const cachedMovieData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (cachedMovieData) {
      // If data is found in storage, set it to state
      setMovieDetails(cachedMovieData);
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
            console.log(writers);
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

  return (
    <Container>
      <Sidebar>
        <Logo>
          <Link to="/">
            <img src="/images/tv.png" alt="Movielogo" />
          </Link>
          <h4>MovieBox</h4>
        </Logo>
        <Navcontent>
          {" "}
          <img src="/images/Home.png" alt="home" />
          <p>Home</p>
        </Navcontent>
        <Navcontent>
          {" "}
          <img src="/images/Movie Projector.png" alt="movie" />
          <p>Movies</p>
        </Navcontent>
        <Navcontent>
          <img src="/images/TV Show.png" alt="show" />
          <p>TV Series</p>
        </Navcontent>
        <Navcontent>
          <img src="/images/Calendar.png" alt="date" />
          <p>Upcoming</p>
        </Navcontent>
        <Promotion>
          <p
            style={{
              fontWeight: "600",
              fontSize: "15px",
              lineHeight: "22.5px",
              paddingBottom: "10px",
            }}
          >
            Play movie quizes and earn free tickets
          </p>
          <p
            style={{
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "18px",
              color: "#666666",
              paddingBottom: "10px",
            }}
          >
            50k people are playing now
          </p>
          <Genrecard
            style={{
              background: "#be123c1a",
              fontSize: "12px",
              padding: "5px 20px",
            }}
          >
            Start playing
          </Genrecard>
        </Promotion>
        <Navcontent>
          <img src="/images/Logout.png" alt="date" />
          <p>Log out</p>
        </Navcontent>
      </Sidebar>
      {movieDetails ? (
        <Wrapper>
          <Navbar2 />
          <Poster>
            {trailerKey && (
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
            )}
          </Poster>
          <Omega style={{ display: "flex", width: "100%" }}>
            <Moviedetails>
              <Top>
                <p data-testid="movie-title" style={{ marginRight: "20px" }}>
                  {movieDetails.title}
                </p>
                <p
                  data-testid="movie-release-date"
                  style={{ marginRight: "20px" }}
                >
                  {releaseDate}
                </p>
              </Top>
              <Top>
                <p data-testid="movie-runtime">{runtime}</p>
                <Genrecard>Action</Genrecard>
                <Genrecard>Drama</Genrecard>
              </Top>
              <Description>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "30px",
                  }}
                  data-testid="movie-overview"
                >
                  {movieDetails.overview}
                </p>
              </Description>
              <Description2>
                <p>
                  Director : <span>{director ? director : "Not Found"}</span>{" "}
                </p>
                {Array.isArray(writers) ? (
                  <div>
                    <p>
                      Writers:{" "}
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
                      Stars:{" "}
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
            <Moviedetailsright>
              <Top>
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="/images/save.png"
                  alt="heart"
                />
                <img src="/images/share2.png" alt="share" />
                <img src="/images/bookmark2.png" alt="save" />
                <img src="/images/Star (1).png" alt="heart" />
                <p>8.5 </p>
                <p>| 350k</p>
              </Top>
              <Button1>
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
              </Ads>
            </Moviedetailsright>
          </Omega>
        </Wrapper>
      ) : (
        <Spinner />
      )}
      <Footer />
    </Container>
  );
};

export default Movie;
