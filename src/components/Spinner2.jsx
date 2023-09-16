import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const Spinner2 = () => {
  return (
    <Container>
        <img src="/images/1495 (1).gif" alt="loader" />
    </Container>
  )
}

export default Spinner2
