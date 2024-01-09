import { useEffect, useState } from 'react'

function useDebounce(searchValue: string) {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue) //없애도?

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      return setDebouncedSearchValue(searchValue)
    }, 400)
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  return debouncedSearchValue
}

export default useDebounce
