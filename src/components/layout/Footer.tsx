import React from 'react'
import styled from 'styled-components'
import InnerLayout from './InnerLayout'
import { GithubIcon } from '../../constants/icon'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <FooterContainer>
      <InnerLayout>
        <div className="logo">
          <img src="/logo.webp" alt="logo" />
        </div>
        <div className="copyright">
          <span>&copy; {currentYear} CINEMA PARADISO. All Rights Reserved.</span>
          <a href="https://github.com/iziz9/cinema-paradiso" target="_blank" rel="noreferrer" aria-label="github">
            <GithubIcon />
          </a>
        </div>
      </InnerLayout>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  height: var(--height-footer);
  color: var(--colors-gray);

  .logo {
    padding-top: 16px;
    img {
      width: 100px;
      height: 45px;
    }
  }

  .copyright {
    font-size: 12px;
    line-height: 1.4rem;
    display: flex;
    justify-content: space-between;
  }
`

export default Footer
