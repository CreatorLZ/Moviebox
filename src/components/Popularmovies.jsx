import React from "react";
import styled from "styled-components";
import PopularList from "./PopularList";


const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 40px 80px;
  background: #f5f5f5;
  overflow-x: hidden;
  @media only screen and (max-width: 420px) {
    padding: 20px;
  }
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 40px 0px;
  h2 {
    border-left: 4px solid #be123c;
  }
  p {
    font-size: 20px;
  }
  @media only screen and (max-width: 420px) {
    padding: 10px 0px;
    align-items: center;
    p {
      font-size: 16px;
    }
    h2 {
      font-size: 20px;
      border-left: 4px solid #be123c;
    }
  }
`;
const Popularmovies = () => {
  return (
    <Container>
      <Top>
        <h2 style={{ cursor: "pointer", color: "#be123c" }}>Popular</h2>
      </Top>
      <PopularList />
    </Container>
  );
};

export default Popularmovies;
