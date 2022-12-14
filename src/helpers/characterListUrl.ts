import { z } from "zod"
import { ParsedUrlQuery } from "querystring"
import { CharactersListParams } from "../api/swapi"

/*
Here we have some helper functions to handle tasks like building the right path,
validate that the query params are valid, set default values in case they are not
valid and build urls for navigation.

These helpers allow us to have a place where we can deal with problems more related
to transforming and validating data.
*/

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
): CharactersListParams => {
  const searchSafe = searchSchema.safeParse(query.search)
  const search = searchSafe.success ? searchSafe.data : null

  const pageSafe = pageSchema.safeParse(query.page)
  const page = pageSafe.success ? pageSafe.data : null

  return { search, page }
}

export const setCharacterListParams = (
  sourceUrl: URL,
  { page, search }: CharactersListParams
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
