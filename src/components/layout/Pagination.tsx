import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DoubleLeftIcon, DoubleRightIcon, LeftIcon, RightIcon } from '../../constants/icon'

interface IPagination {
  totalPages: number
  viewLimit: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ totalPages, viewLimit, page, setPage }: IPagination) => {
  // double 버튼 눌렀을 때 버튼목록 마지막페이지arr 안나옴
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([])
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([])

  useEffect(() => {
    if (page % viewLimit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / viewLimit)])
    } else if (page % viewLimit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / viewLimit) - 1])
    }
  }, [page])

  const sliceArrayByLimit = (totalPages: number) => {
    const totalPageArray = Array(totalPages)
      .fill(null)
      .map((_, i) => i)
    return Array(Math.ceil(totalPages / viewLimit))
      .fill(null)
      .map(() => totalPageArray.splice(0, viewLimit))
  }

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPages)
    setTotalPageArray(slicedPageArray)
    setCurrentPageArray(slicedPageArray[0])
  }, [totalPages])

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
  background-color: orange;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const PageButtonContainer = styled.div`
  position: relative;
  display: flex;
  gap: 15px;

  button[aria-current='page'] {
    color: var(--colors-green);
  }
`
const PageButton = styled.button`
  position: relative;
  font-size: 1.2rem;
`

export default Pagination
