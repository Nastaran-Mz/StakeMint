import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  // padding: 32px 16px;
  // background-image: url('/images/Stakebglight.jpeg');
  // background-repeat: no-repeat;
  // background-position: bottom 24px center;
  // background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/arch-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.svg'),
      url('/images/Stakeleft.png');
    background-repeat: no-repeat;
    background-position: center 700px, 5% 130px, 20% 1px;
    background-size: cover, 266px, 1166px;
    background-attachment: fixed;
    min-height: 90vh;
  }
`

export default Container
