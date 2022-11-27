const base = "https://swapi.dev/api"

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

export const getCharactersList = async ({
  page,
  search,
}: {
  page?: number | null
  search?: string | null
}): Promise<PeopleResponse> => {
  const url = new URL("people/", base)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (search) {
    url.searchParams.append("search", search)
  }

  const res = await fetch(url)
  return (await res.json()) as PeopleResponse
}
