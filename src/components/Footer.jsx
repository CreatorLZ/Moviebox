import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: whitesmoke;
  gap: 20px;
  @media only screen and (max-width: 420px) {
    padding-top:20px;
    height: 50vh;
  }
`;
const Icondiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
const Navdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;
const Credits = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <Container>
      <Icondiv>
        <img src="/images/fa-brands_facebook-square.png" alt="fb" />
        <img src="/images/fa-brands_instagram.png" alt="inst" />
        <img src="/images/fa-brands_twitter.png" alt="X" />
        <img src="/images/fa-brands_youtube.png" alt="you" />
      </Icondiv>
      <Navdiv>
        <p>Conditions of Use</p>
        <p>Privacy & Policy</p>
        <p>Press Room</p>
      </Navdiv>
      <Credits>© 2023 MovieBox </Credits>
      <Credits>
        With{" "}
        <img
          src="/images/icons8-heart.gif"
          alt="love"
          style={{ width: "25px", height: "25px" }}
        />{" "}
        <strong>isaac C Anyim</strong>{" "}
      </Credits>
    </Container>
  );
};

export default Footer;
