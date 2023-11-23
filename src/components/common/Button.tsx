import styled from 'styled-components'

type ButtonProps = {
  text: string
  action: () => void
}
// 사용 : <Button text={'마이페이지'} action={() => navigate(PATH.MYPAGE)} />

const Button = ({ text, action }: ButtonProps) => {
  return <ButtonContainer onClick={action}>{text}</ButtonContainer>
}

const ButtonContainer = styled.button`
  background-color: greenyellow;
`

export default Button
