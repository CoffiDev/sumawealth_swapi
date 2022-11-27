import { setCharacterListParams } from "../../helpers/characterListUrl"

const base = "https://swapi.dev"

type ResponsePagination<Results> = {
  count: number
  next: string | null
  previous: string | null
  results: Results[]
}

export type People = {
  birth_year: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  created: Date
  edited: Date
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}

export type PeopleResponse = ResponsePagination<People>

export type CharactersListSearchParams = {
  page: number | null
  search: string | null
}

export const getCharactersList = async (
  params: CharactersListSearchParams
): Promise<PeopleResponse> => {
  const url = setCharacterListParams(new URL("api/people", base), params)
  const res = await fetch(url)
  return (await res.json()) as PeopleResponse
}
