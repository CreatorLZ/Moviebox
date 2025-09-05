import React from "react";
import styled from "styled-components";

// Components
import Header from "../components/Header";
import Featuredmovies from "../components/Featuredmovies";
import Latestmovies from "../components/Latestmovies";
import Popularmovies from "../components/Popularmovies";
import Footer from "../components/Footer";

// Styled Components
const Container = styled.div`
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* Desktop styles */
  @media (min-width: 1024px) {
    max-width: 1440px;
  }
`;

/**
 * Landing page component that serves as the main entry point of the application.
 * Displays the header, featured movies, latest movies, popular movies, and footer.
 */
const Landing = () => {
  return (
    <Container>
      <Header />
      <Featuredmovies />
      <Latestmovies />
      <Popularmovies />
      <Footer />
    </Container>
  );
};

export default Landing;
