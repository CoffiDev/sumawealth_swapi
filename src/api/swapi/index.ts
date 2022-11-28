import { setCharacterListParams } from "@/helpers/characterListUrl"

const base = "https://swapi.dev"

export const peoplePath = "/api/people/"

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

type ResponsePagination<Results> = {
  count: number
  next: string | null
  previous: string | null
  results: Results[]
}

type ResponseData<Response> = {
  status: number
  result: Response
}

export type PeoplePaginatedResponse = ResponseData<ResponsePagination<People>>

export type PeopleDetailsResponse = ResponseData<People>

export type CharactersListParams = {
  page: number | null
  search: string | null
}

export type CharacterDetailsParams = {
  id: number
}

export const getCharactersList = async (
  params: CharactersListParams
): Promise<PeoplePaginatedResponse> => {
  const url = setCharacterListParams(new URL(peoplePath, base), params)
  const res = await fetch(url)
  const result = (await res.json()) as ResponsePagination<People>

  return {
    result,
    status: res.status,
  }
}

export const getCharacterDetails = async (
  params: CharacterDetailsParams
): Promise<PeopleDetailsResponse> => {
  const url = new URL(`${peoplePath}${params.id}`, base)
  const res = await fetch(url)
  const result = (await res.json()) as People

  return {
    result,
    status: res.status,
  }
}
