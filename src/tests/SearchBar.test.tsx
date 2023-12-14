import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MainPage from '../pages/MainPage'
import * as request from '../api/request'
import { delay, mockConsoleError } from './testUtils'

describe('Search function test', () => {
  mockConsoleError()
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('포커스 시 드롭다운 열림', async () => {
    render(<MainPage />)
  })

  test('외부 클릭 시 드롭다운 닫힘', async () => {
    render(<MainPage />)
  })

  test('20글자까지만 입력 가능', async () => {
    render(<MainPage />)
  })

  test('공백문자/검색어 없을 시 api전송하지 않음, "검색 결과 없음" 드롭다운 표시', async () => {
    render(<MainPage />)
  })

  test('공백문자/검색어 없을 시 검색버튼 클릭하면 "검색어를 입력하세요" 모달 표시', async () => {
    render(<MainPage />)
  })

  test('드롭다운 리스트를 키보드로 이동할 수 있다', async () => {
    render(<MainPage />)
  })

  test('드롭다운 마지막 리스트에서 아래 방향키를 누르면 동작하지 않는다', async () => {
    render(<MainPage />)
  })

  test('드롭다운 첫 번째 리스트에서 위 방향키를 누르면 input으로 포커스가 돌아간다', async () => {
    render(<MainPage />)
  })
  test('input에 포커스 된 상태에서 위 방향키를 누르면 동작하지 않는다', async () => {
    render(<MainPage />)
  })
  test('드롭다운을 닫았다가 다시 열면 input으로 포커스가 돌아간다', async () => {
    render(<MainPage />)
  })
})
