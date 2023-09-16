import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: hidden;
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
    /* padding: 20px; */
    width: 15%;
    border-radius: 0px;
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
      margin: 5px;
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
    margin-left: 15%;
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
    img {
    }
    justify-content: center;
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
  /* background-image: url("./images/Rectangle 29.png"); */
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  iframe {
    border-radius: 10px;
  }
  @media only screen and (max-width: 420px) {
    height: 30vh;
    width: 100%;
    iframe {
      height: 30vh;
    }
  }
`;

const Moviedetails = styled.div`
  width: 744px;
  height: 100%;
`;
const Moviedetailsright = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    font-weight: 400;
    font-size: 14px;
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
    width: 300px;
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
    width: 300px;
    margin-bottom: 20px;
  }
`;
const Descbottom = styled.div`
  width: 90%;
  border-radius: 10px;
  border: 1px solid gray;
  height: 50px;
  display: flex;
  margin-top: 20px;
  /* margin-bottom:10px; */
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
    width: 90%;
    padding: 10px 20px;
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
    width: 90%;
    padding: 10px 20px;
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
    width: 90%;
  }
`;
const Adbottom = styled.div`
  width: 295px;
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
`;
const Omega = styled.div`
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
  }
`;
const Movie = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [runtime, setRunTime] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");

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
        const releaseDateUTC = releaseDate.toUTCString();

        // Set the formatted release date to the state
        setReleaseDate(releaseDateUTC);
        
        // Fetch trailer data for the movie using the getTrailerDataForMovie function
        const trailerKey = await getTrailerDataForMovie(id);
        setTrailerKey(trailerKey);
        // Fetch movie credits using the fetchMovieCredits function
        fetchMovieCredits(id);
        const runtimeInMinutes = response.data.runtime;
        const formattedRuntime =
          convertRuntimeToHoursAndMinutes(runtimeInMinutes);
        setRunTime(formattedRuntime);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
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
          <Poster>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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
                  Director : <span>Joseph Kosinski</span>{" "}
                </p>
                <p>
                  Writers : <span>Jim Cash, Jack Epps Jr, Peter Craig</span>{" "}
                </p>
                <p>
                  Stars :{" "}
                  <span> Tom Cruise, Jennifer Connelly, Miles Teller</span>{" "}
                </p>
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
    </Container>
  );
};

export default Movie;
