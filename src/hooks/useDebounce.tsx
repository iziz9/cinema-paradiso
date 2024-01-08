import { useEffect, useState } from 'react'

function useDebounce(searchValue: string) {
  const [debouncedValue, setDebouncedValue] = useState(searchValue) //없애도?

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      return setDebouncedValue(searchValue)
    }, 400)
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  return debouncedValue
}

export default useDebounce
