import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spinner2 from "./Spinner2";

const Container = styled.div`
  width: 100%;
  padding: 10px 50px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  z-index: 5;
  Link {
    text-decoration: none;
    p {
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 420px) {
    padding: 10px;
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

const Search = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  border: none;
  color: #ffffff;
  background: transparent;
  border-radius: 10px;
  input {
    border: none;
    background: transparent;
    color: #ffffff;
    width: 70%;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    ::placeholder {
      color: #da2f2f;
      font-size: 16px;
      font-weight: 400;
    }
    :focus {
      border: none;
      outline: none;
    }
  }
  @media only screen and (max-width: 420px) {
    width: 80%;
    input{
      font-size: 12px;
      width: 90%;
      font-weight: 300;
    }
  }
`;
const Searchbox = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  font-size: 30px;
  width: 60%;
  border: 2px solid #ffffff;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.5);
  color: #ffffff;
  img {
    object-fit: contain;
  }
  @media only screen and (max-width: 420px) {
    width: 90%;
  }
`;
const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  float: right;

  p:first-child{
    cursor: pointer;
    &:hover{
      padding: 5px 0px ;
      border-radius: 5px;
      color:whitesmoke;
      background-color: rgba(146, 142, 142, 0.2);
    }
  }

  @media only screen and (max-width: 420px) {
    p {
      display: none;
    }
  }
`;
const Div =styled.div`
width: fit-content;
padding: 3px;
border-radius: 5px;
cursor: pointer;
  &:hover{
      background-color: rgba(124, 122, 122, 0.2);

    }
`
const Searchresults = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 85px;
  left: 445px;
  width: 528px;
  min-height: 50px;
  max-height: 200px;
  background-color: whitesmoke;
  border-radius: 3px;
  overflow: scroll;
  overflow-x: hidden;
  transition: top 0.5s ease-in-out;
   /* Customize scrollbar */
   &::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
  }

  /* Customize scrollbar track */
  &::-webkit-scrollbar-track {
    background: transparent; /* Background color of the scrollbar track */
  }

  /* Customize scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners of the scrollbar thumb */
  }

  ul {
    list-style: none;
    color: black;
    text-decoration: none !important;
  }
  li {
    padding: 10px;
    background: #f8e7eb;
    margin-bottom: 3px;
    cursor: pointer;
    text-decoration: none !important;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    img {
      width: 100px;
      height: 100px;
    }
  }

  @media only screen and (max-width: 420px) {
    top: 60px;
    left: 78px;
    width: 225px;
  }
`;

const Navbar = () => {
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

  const [searchInput, setSearchInput] = useState(""); // State variable for user input
  const [searchResults, setSearchResults] = useState([]); // State variable for search results
  const [isLoading, setIsLoading] = useState(false); // State variable for loading state
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  const searchMovies = () => {
    if (searchInput) {
      setIsLoading(true);
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchInput, // Use the user's search input as the query
            page: 1,
          },
        })
        .then((response) => {
          // Set the search results
          setSearchResults(response.data.results);
          setIsLoading(false);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.error("Error searching for movies:", error);
        });
    } else {
      // Clear the search results if the search input is empty
      setSearchResults([]);
    }
  };
  // Use useEffect to trigger the movie search when the searchInput changes
  useEffect(() => {
    searchMovies();
  }, [searchInput]);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    setIsSearchEmpty(!inputValue.trim());
  };

  const clearSearchInput = () => {
    setSearchInput('');
    setIsSearchEmpty(true);
  };
  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src="/images/tv.png" alt="Movielogo" />
        </Link>
        <h4>MovieBox</h4>
      </Logo>
      <Search>
        <Searchbox>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={searchInput}
            onChange={handleInputChange}
          />
           {isSearchEmpty ? (
            <img src="/images/Search.png" alt="search" />
          ) : (
            <Div onClick={clearSearchInput}>
              <img style={{width:"25px", height:"25px"}} src="/images/cancel2.png" alt="cancel" />
            </Div>
          )}
        </Searchbox>
      </Search>
      <Auth>
        <p>Sign in</p>
        <Div style={{display:"flex", alignItems:"center",gap:"5px",}}>
        <img src="/images/Menu.png" alt="menu" />
        <p>Menu</p>
        </Div>
      </Auth>
      
        
      {searchInput && (
        <Searchresults style={{ top: searchInput ? "95px" : "-200px" }}>
          {isLoading ? <Spinner2/>:
          <ul>
            {searchResults.map((movie) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/movies/${movie.id}`}
              >
                <li
                  style={{ textDecoration: "none", color: "black" }}
                  key={movie.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  {movie.title}
                </li>
              </Link>
            ))}
          </ul> }
        </Searchresults>
      )}
    </Container>
  );
};

export default Navbar;
