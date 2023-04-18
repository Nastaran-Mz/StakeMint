import React from 'react'
import styled from 'styled-components'
import { Text, Button, InfoIcon, Link } from '@nguyenphu27/uikit'
import { margin } from 'polished'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 240px;
  }
`

const VersionBar = () => {
  return (
    <Wrapper style={{backgroundColor:'#E4E4E4'}}>
      
      {/* <Button style={{backgroundColor:'#D5D5D5',color:'black'}}
        variant="subtle"
        as={Link}
        href="#"
        scale="sm"
        ml="16px"
        target="_blank"
      >
        About
      </Button>
      <Button style={{backgroundColor:'#D5D5D5',color:'black'}}
        variant="subtle"
        as={Link}
        href="#"
        scale="sm"
        ml="16px"
        target="_blank"
      >
        Help
      </Button>
      <Button style={{backgroundColor:'#D5D5D5',color:'black'}}
        variant="subtle"
        as={Link}
        href="#"
        scale="sm"
        ml="16px"
        target="_blank"
      >
       FAQ
      </Button> */}

      <Text color='black' >
        About
        Help
        FAQ
      </Text>
    </Wrapper>
  )
}

export default VersionBar
