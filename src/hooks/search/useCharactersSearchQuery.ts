import { QueryFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
  type CharactersListParams,
  type PeoplePaginatedResponse,
  getCharactersList,
} from "@/api/swapi"

/*
We have the key and query function separated from the hook declaration
to be able to reuse them in other context as needed. In this case, this
helps to avoid duplication when using the query on the client and
prefetching it on the server side.
*/

export const getCharactersSearchQueryKey = (params: CharactersListParams) =>
  ["searchCharacters", params.search, params.page] as const

export const characterSearchQueryFn: QueryFunction<
  PeoplePaginatedResponse,
  ReturnType<typeof getCharactersSearchQueryKey>
> = ({ queryKey }) => {
  const [, search, page] = queryKey

  return getCharactersList({ search, page })
}

export const useCharactersSearchQuery = (params: CharactersListParams) =>
  useQuery({
    queryKey: getCharactersSearchQueryKey(params),
    queryFn: characterSearchQueryFn,
  })
