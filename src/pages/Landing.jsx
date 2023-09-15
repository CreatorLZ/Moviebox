import React from 'react'
import Header from '../components/Header'
import Featuredmovies from '../components/Featuredmovies'
import styled from 'styled-components'
import Footer from '../components/Footer'

const Container = styled.div`
  overflow-x: hidden;
`

const Landing = () => {
  return (
    <Container>
    <Header/>
    <Featuredmovies/>
    <Footer/>
    </Container>
  )
}

export default Landing