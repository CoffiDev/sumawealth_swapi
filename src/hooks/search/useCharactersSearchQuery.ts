import { QueryFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
  type CharactersListParams,
  type PeoplePaginatedResponse,
  getCharactersList,
} from "../../api/swapi"

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
