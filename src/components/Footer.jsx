import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

`
const Icondiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
`
const Navdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`
const Credits = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Footer = () => {
  return (
    <Container>
        <Icondiv>
            <img src="./images/fa-brands_facebook-square.png" alt="fb" />
            <img src="./images/fa-brands_instagram.png" alt="inst" />
            <img src="./images/fa-brands_twitter.png" alt="X" />
            <img src="./images/fa-brands_youtube.png" alt="you" />
        </Icondiv>
        <Navdiv>
            <p>Conditions of Use</p>
            <p>Privacy & Policy</p>
            <p>Press Room</p>
        </Navdiv>
        <Credits style={{width:"100%"}}>© 2023 MovieBox by  <strong> Isaac Chimaroke Anyim</strong>   </Credits>
    </Container>
  )
}

export default Footer