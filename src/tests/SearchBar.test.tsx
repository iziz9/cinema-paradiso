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

  test('포커스 시 드롭다운 열림, esc키 누르면 드롭다운 닫힘', async () => {
    render(<RoutedMainPage />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.click(searchbox)
    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
    searchbox.focus()
    userEvent.keyboard('{Escape}')
    // expect(await screen.findByText('검색 결과가 없습니다.')).not.toBeInTheDocument() //안되는코드
    await waitFor(() => {
      expect(screen.queryByText('검색 결과가 없습니다.')).not.toBeInTheDocument()
    })
  })

  test('포커스 시 드롭다운 열림, 외부 클릭 시 드롭다운 닫힘', async () => {
    render(<RoutedMainPage />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.click(searchbox)
    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
    searchbox.blur()
    expect(await screen.findByText('검색 결과가 없습니다.')).not.toBeInTheDocument()
  })

  test('20글자까지만 입력 가능', async () => {
    render(<RoutedMainPage />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.type(searchbox, 'aaaaaaaaaaaaㅋㅌ ㅕㅣㅕaaaaaaaaaaa')
    expect(searchbox.value).toHaveLength(20)
  })

  test('공백문자는 전송하지 않고 "검색 결과 없음" 드롭다운 표시', async () => {
    render(<RoutedMainPage />)
    const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
    userEvent.type(searchbox, '        ')
    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
  })

  test('공백문자/검색어 없이 검색버튼 클릭 시 "검색어를 입력하세요" alert 표시', async () => {
    render(<RoutedMainPage />)
    const searchbutton = screen.getByTestId<HTMLButtonElement>('searchbutton')
    window.alert = jest.fn()
    userEvent.click(searchbutton)
    await waitFor(() => {
      expect(window.alert).toBeCalledWith('검색어를 입력해주세요.')
    })
  })

  // test('드롭다운 마지막 리스트에서 아래 방향키를 누르면 동작하지 않는다', async () => {
  //   render(<RoutedMainPage />)
  //   const searchbox = screen.getByRole<HTMLInputElement>('searchbox')
  //   userEvent.type(searchbox, '집')
  //   expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument()
  //   userEvent.keyboard('{Escape}')
  // })

  // test('드롭다운 첫 번째 리스트에서 위 방향키를 누르면 input으로 포커스가 돌아간다', async () => {
  //   render(<RoutedMainPage />)
  // })
  // test('input에 포커스 된 상태에서 위 방향키를 누르면 동작하지 않는다', async () => {
  //   render(<RoutedMainPage />)
  // })
  // test('드롭다운을 닫았다가 다시 열면 input으로 포커스가 돌아간다', async () => {
  //   render(<RoutedMainPage />)
  // })
})
