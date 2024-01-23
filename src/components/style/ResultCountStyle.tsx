import { ReactNode } from 'react'
import styled from 'styled-components'

const ResultCountStyle = ({ children }: { children: ReactNode }) => {
  return <ResultsCount>{children}</ResultsCount>
}
const ResultsCount = styled.div`
  padding: 30px 32px 16px;
  display: flex;
  justify-content: end;
`
export default ResultCountStyle
