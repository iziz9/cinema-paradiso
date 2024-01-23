import { ReactNode } from 'react'
import styled from 'styled-components'

const MovieListStyle = ({ children }: { children: ReactNode }) => {
  return <ListContainer>{children}</ListContainer>
}

const ListContainer = styled.ul`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  padding: 0 16px;
`

export default MovieListStyle
