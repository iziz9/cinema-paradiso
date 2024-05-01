import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RoutedPage, mockConsoleError } from './testUtils'
import Header from '../components/layout/Header'
import app from '../firebase'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

const firebaseApp = app
describe('Search function test', () => {
  mockConsoleError()
  afterEach(() => {
    jest.clearAllMocks()
  })
  const RoutedHeader = () => <RoutedPage page={<Header />} />

  test('포커스 시 드롭다운 열림, esc키 누르면 드롭다운 닫힘', async () => {
    render(<RoutedHeader />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.click(searchbox)
    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
    searchbox.focus()
    userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('검색 결과가 없습니다.')).not.toBeInTheDocument()
    })
  })

  test('포커스 시 드롭다운 열림, 외부 클릭 시 드롭다운 닫힘', async () => {
    render(<RoutedHeader />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.click(searchbox)
    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
    searchbox.blur()
    await waitFor(() => {
      expect(screen.queryByText('검색 결과가 없습니다.')).not.toBeInTheDocument()
    })
  })

  test('공백문자는 전송하지 않고 "검색 결과 없음" 드롭다운 표시', async () => {
    render(<RoutedHeader />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.type(searchbox, '        ')
    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
  })

  test('공백문자/검색어 없이 검색버튼 클릭 시 "검색어를 입력해주세요" 토스트 표시', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const searchbutton = screen.getByTestId<HTMLButtonElement>('searchbutton')
    userEvent.click(searchbutton)
    await waitFor(() => {
      expect(screen.getByText('검색어를 입력해주세요.')).toBeInTheDocument()
    })
  })

  // test('드롭다운을 닫았다가 다시 열면 포커스가 초기화된다', async () => {
  //   render(<RoutedHeader />)
  // })

  // test('드롭다운 마지막 리스트에서 아래 방향키를 누르면 동작하지 않는다', async () => {
  //   render(<RoutedMainPage />)
  //   const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
  //   userEvent.type(searchbox, '집')
  //   expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
  //   userEvent.keyboard('{Escape}')
  // })

  // test('input에 포커스 된 상태에서 위 방향키를 누르면 동작하지 않는다', async () => {
  //   render(<RoutedMainPage />)
  // })
})
