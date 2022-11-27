import { z } from "zod"
import { ParsedUrlQuery } from "querystring"
import { CharactersListSearchParams } from "../api/swapi"

const pageSchema = z.preprocess((a) => {
  const defaultPage = 1
  const preValue = parseInt(
    z.string().default(defaultPage.toString()).parse(a),
    10
  )
  return isNaN(preValue) ? defaultPage : preValue
}, z.number().positive().nullish().default(null))

const searchSchema = z.string().nullish().default(null)

export const getCharacterListSearchParams = (
  query: ParsedUrlQuery
): CharactersListSearchParams => {
  const search = searchSchema.parse(query.search)

  const page = pageSchema.parse(query.page)

  return { search, page }
}

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

export const getSearchUrl = (pathname: string, search: string) => {
  const url = setCharacterListParams(
    new URL(pathname, window.location.origin),
    {
      page: 1,
      search,
    }
  )

  return url.pathname + url.search
}
