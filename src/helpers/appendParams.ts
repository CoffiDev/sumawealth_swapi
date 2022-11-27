import { CharactersListSearchParams } from "../api/swapi"

export const setCharacterListParams = (
  sourceUrl: URL,
  { page, search }: CharactersListSearchParams
) => {
  const url = new URL(sourceUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (search) {
    url.searchParams.append("search", search)
  }

  return url
}
