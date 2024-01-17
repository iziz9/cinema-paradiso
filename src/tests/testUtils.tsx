import { BrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function mockConsoleError() {
  const consoleMock = jest.spyOn(console, 'error')
  consoleMock.mockImplementation(() => undefined)

  return consoleMock
}

export const RoutedPage = ({ page }: { page: ReactNode }) => <BrowserRouter>{page}</BrowserRouter>
