import { QueryFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
  type CharactersListSearchParams,
  type PeopleResponse,
  getCharactersList,
} from "../../api/swapi"

export const getCharacterSearchQueryKey = (s: CharactersListSearchParams) =>
  ["searchCharacters", s.search, s.page] as const

export const characterSearchQueryFn: QueryFunction<
  PeopleResponse,
  ReturnType<typeof getCharacterSearchQueryKey>
> = ({ queryKey }) => {
  const [, search, page] = queryKey

  return getCharactersList({ search, page })
}

export const useCharactersSearchQuery = (params: CharactersListSearchParams) =>
  useQuery({
    queryKey: getCharacterSearchQueryKey(params),
    queryFn: characterSearchQueryFn,
  })
