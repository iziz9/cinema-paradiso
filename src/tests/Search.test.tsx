import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RoutedPage, mockConsoleError } from './testUtils'
import Header from '../components/layout/Header'

// describe('검색 기능', () => {
//   mockConsoleError()
//   afterEach(() => {
//     jest.clearAllMocks()
//   })
//   it('검색 인풋과 버튼이 있음', () => {
//     const { getByPlaceholderText, getBy } = render(<Header />)
//   })
// })
