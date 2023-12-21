import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Spinner = () => {
  return (
    <Container>
        <img src="/images/1496.gif" alt="loader" />
    </Container>
  )
}

export default Spinner