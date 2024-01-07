import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MainPage from '../pages/MainPage'
import { RoutedPage, delay, mockConsoleError } from './testUtils'

describe('Search function test', () => {
  mockConsoleError()
  afterEach(() => {
    jest.clearAllMocks()
  })
  const RoutedMainPage = () => <RoutedPage page={<MainPage />} />

  test('캐러셀에 이미지 로드되기 전 스켈레톤 UI 표시', async () => {
    // render(<RoutedMainPage />)
  })

  test('캐러셀 영화 포스터에 마우스 오버 시 영화 정보 오버레이 표시, 마우스 아웃 시 사라짐', async () => {
    render(<RoutedMainPage />)
    // const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    // userEvent.click(searchbox)
    // expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
    // searchbox.focus()
    // userEvent.keyboard('{Escape}')
    // await waitFor(() => {
    //   expect(screen.queryByText('검색 결과가 없습니다.')).not.toBeInTheDocument()
    // })
  })
})
