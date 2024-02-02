import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IInfinityScrollProps } from '../types/hooksTypes'

const useInfinityScroll = ({
  request,
  payload,
  page,
  setPage,
  setMovieList,
  setTotalResults
}: IInfinityScrollProps) => {
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  const getListData = useCallback(
    async (payload: string, page: number) => {
      try {
        setIsLoading(true)
        const listData = await request(page)
        if (!listData) {
          setLastPage(true)
          setMovieList([])
          return setIsLoading(false)
        }

        if (!listData.results) {
          setMovieList((prevList) => [...prevList, listData])
          setTotalResults((prev) => {
            return { totalCount: prev.totalCount, totalPages: prev.totalPages }
          })
          return setIsLoading(false)
        }

        setMovieList((prevList) => [...prevList, ...listData.results])
        setTotalResults({ totalCount: listData.total_results, totalPages: listData.total_pages })
        listData.total_pages === page ? setLastPage(true) : setLastPage(false)
      } catch (error) {
        alert(error)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, payload]
  )

  useEffect(() => {
    setPage(1)
    setMovieList([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload])

  useEffect(() => {
    if (inView && !lastPage) {
      setPage((prev: number) => prev + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, lastPage])

  return { lastPage, isLoading, getListData, ref }
}

export default useInfinityScroll
