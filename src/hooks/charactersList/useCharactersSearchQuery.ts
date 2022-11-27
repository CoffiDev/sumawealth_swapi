import { useQuery } from "@tanstack/react-query"
import { getCharactersList } from "../../api/swapi"

const useCharactersSearchQuery = ({
  search,
  page,
}: {
  search: string | null
  page: number | null
}) => {
  return useQuery({
    queryKey: ["searchCharacters", { search, page }] as const,
    queryFn: ({ queryKey }) => {
      const [, payload] = queryKey

      return getCharactersList(payload)
    },
  })
}

export { useCharactersSearchQuery }
