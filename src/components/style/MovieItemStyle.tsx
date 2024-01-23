import { ReactNode } from 'react'
import styled from 'styled-components'

const MovieItemStyle = ({ children }: { children: ReactNode }) => {
  return <ListItem>{children}</ListItem>
}
const ListItem = styled.li`
  position: relative;
  width: calc(100% / 5 - 4px);
  margin: 16px 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1); /* 크롬, 사파리 */
    -moz-transform: scale(1.1); /* 파이어폭스 */
    -ms-transform: scale(1.1); /* IE */
    -o-transform: scale(1.1); /* 오페라 */
    transition: transform 0.3s;
  }

  @media (max-width: 1024px) {
    width: calc(100% / 5 - 4px);
  }
  @media (max-width: 833px) {
    width: calc(100% / 4 - 4px);
  }
  @media (max-width: 600px) {
    width: calc(100% / 3 - 4px);
  }
  @media (max-width: 450px) {
    width: calc(100% / 2 - 4px);
  }
`

export default MovieItemStyle
