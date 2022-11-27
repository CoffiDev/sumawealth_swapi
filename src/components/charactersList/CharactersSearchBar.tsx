import { useEffect, useRef, useState } from "react"
import { useDebounce } from "../../hooks/utils/useDebounce"
import { useRouter } from "next/router"
import { setCharacterListParams } from "../../helpers/appendParams"

const useDebounceCharacterSearch = () => {
  const router = useRouter()

  const defaultValue = (router?.query?.search as string) ?? ""

  const prevRef = useRef(defaultValue)

  const [searchTerm, setSearchTerm] = useState(defaultValue)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const onNewSearchTerm = async () => {
    if (debouncedSearchTerm || debouncedSearchTerm != prevRef.current) {
      const url = setCharacterListParams(
        new URL(router.pathname, window.location.origin),
        {
          page: 1,
          search: debouncedSearchTerm,
        }
      )

      await router.push(url.pathname + url.search, undefined, {
        shallow: true,
      })
    }

    prevRef.current = debouncedSearchTerm
  }

  useEffect(() => {
    onNewSearchTerm()
  }, [debouncedSearchTerm])

  return { setSearchTerm, defaultValue }
}

export const CharactersSearchBar = () => {
  const { setSearchTerm, defaultValue } = useDebounceCharacterSearch()

  return (
    <div className="flex justify-start items-baseline">
      <label htmlFor="searchInput">Search</label>
      <input
        id="searchInput"
        defaultValue={defaultValue}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
