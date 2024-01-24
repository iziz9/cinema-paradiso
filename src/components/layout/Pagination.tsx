import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DoubleLeftIcon, DoubleRightIcon, LeftIcon, RightIcon } from '../../constants/icon'
import { IPagination } from '../../types/types'

const VIEW_LIMIT = 5

const Pagination = ({ totalPages, page, setPage }: IPagination) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([])
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([])

  useEffect(() => {
    if (page === totalPages) {
      setCurrentPageArray(totalPageArray[totalPageArray.length - 1])
    }
    if (page % VIEW_LIMIT === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / VIEW_LIMIT)])
    } else if (page % VIEW_LIMIT === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / VIEW_LIMIT) - 1])
    }
  }, [page])

  useEffect(() => {
    setPage(1)
    const sliceArrayByLimit = (totalPages: number) => {
      const totalPageArray = Array(totalPages)
        .fill(null)
        .map((_, i) => i)
      return Array(Math.ceil(totalPages / VIEW_LIMIT))
        .fill(null)
        .map(() => totalPageArray.splice(0, VIEW_LIMIT))
    }

    const slicedPageArray = sliceArrayByLimit(totalPages)
    setTotalPageArray(slicedPageArray)
    setCurrentPageArray(slicedPageArray[0])
  }, [totalPages, setPage])

  return (
    <PaginationContainer>
      <button onClick={() => setPage(1)} disabled={page === 1}>
        <DoubleLeftIcon />
      </button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        <LeftIcon />
      </button>
      <PageButtonContainer role="navigation" aria-label="pagination">
        {currentPageArray?.map((i) => (
          <PageButton key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : undefined}>
            {i + 1}
          </PageButton>
        ))}
      </PageButtonContainer>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        <RightIcon />
      </button>
      <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
        <DoubleRightIcon />
      </button>
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;

  svg {
    color: var(--colors-middlegray);
    &:hover {
      color: var(--colors-light);
    }
  }
  button[disabled] {
    svg {
      color: var(--colors-darkgray);
    }
  }
`
const PageButtonContainer = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  button[aria-current='page'] {
    color: var(--colors-green);
  }
`
const PageButton = styled.button`
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--colors-middlegray);
  &:hover {
    color: var(--colors-light);
  }
`

export default Pagination
