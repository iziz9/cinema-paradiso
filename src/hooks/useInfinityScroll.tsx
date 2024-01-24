import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
// import useModal from './useModal'
import { IInfinityScrollProps, ITotalResults } from '../types/hooksTypes'

const useInfinityScroll = ({ request, payload, page, setPage, setMovieList }: IInfinityScrollProps) => {
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)
  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })
  // const { openModal } = useModal()

  const getListData = useCallback(
    async (payload: string, page: number) => {
      try {
        setIsLoading(true)
        const listData = await request(payload, page)
        if (!listData) {
          setLastPage(true)
          setMovieList([])
          return setIsLoading(false)
        }
        setMovieList((prevList) => [...prevList, ...listData.results])
        setTotalResults({ totalCount: listData.total_results, totalPages: listData.total_pages })
        listData.total_pages === page ? setLastPage(true) : setLastPage(false)
      } catch (error) {
        console.log(error)
        // openModal()
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

  return { lastPage, isLoading, totalResults, getListData, ref }
}

export default useInfinityScroll
