import React from 'react'
import styled from 'styled-components'

type InnerLayoutProps = {
  children: React.ReactNode
}

const InnerLayout = ({ children }: InnerLayoutProps) => {
  return <Inner>{children}</Inner>
}

const Inner = styled.div`
  position: relative;
  max-width: 1024px;
  height: 100%;
  margin: auto;
  padding: 0 32px;
  box-sizing: border-box;
`

export default InnerLayout
