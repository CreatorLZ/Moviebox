import React from 'react'
import Header from '../components/Header'
import Featuredmovies from '../components/Featuredmovies'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Latestmovies from '../components/Latestmovies'

const Container = styled.div`
  overflow-x: hidden;
`

const Landing = () => {
  return (
    <Container>
    <Header/>
    <Featuredmovies/>
    <Latestmovies/>
    <Footer/>
    </Container>
  )
}

export default Landing