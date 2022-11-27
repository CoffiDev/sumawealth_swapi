import { QueryFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
  type CharacterDetailsParams,
  type People,
  getCharacterDetails,
} from "../../api/swapi"

export const getCharacterDetailsQueryKey = (params: CharacterDetailsParams) =>
  ["characterDetails", params.id] as const

export const characterDetailsQueryFn: QueryFunction<
  People,
  ReturnType<typeof getCharacterDetailsQueryKey>
> = ({ queryKey }) => {
  const [, id] = queryKey

  return getCharacterDetails({ id })
}

export const useCharacterDetailsQuery = (params: CharacterDetailsParams) =>
  useQuery({
    queryKey: getCharacterDetailsQueryKey(params),
    queryFn: characterDetailsQueryFn,
  })
