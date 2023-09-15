import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    width: 80%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20%;
`
const Spinner = () => {
  return (
    <Container>
        <img src="/images/1495 (1).gif" alt="loader" />
    </Container>
  )
}

export default Spinner