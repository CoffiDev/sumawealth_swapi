import type { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query"

import {
  getCharacterListSearchParams,
  getSearchUrl,
} from "@/helpers/characterListUrl"
import {
  characterSearchQueryFn,
  getCharactersSearchQueryKey,
  useCharactersSearchQuery,
} from "@/hooks/search/useCharactersSearchQuery"
import { useDebouncedValue } from "@/hooks/utils/useDebounceValue"
import { SearchBar } from "@/components/search/SearchBar"
import { MainWrapper } from "@/components/shared/MainWrapper"
import { CharactersListContainer } from "@/components/characters/CharactersListContainer"

/*
We are using server side props because we want to compute the view with
whatever search query a user may enter, so we can not have a static generated
page. This gives us the flexibility of allowing the user to share a page with a
specific search in it, at the cost that these pages are computed on every time.

The page component also works as the "edge" of the application, the point where
we connect the inputs (the page and search params) with our API request. To prevent
errors due to bad inputs, there are validation functions that return valid
params that we can use to call the API.

The use of react query on top of using SSR help us build a great experience for
the users and the developers. It gives us the tools to handle different states
of our application, like loading and no network connection. The cache of previous
request allow the users to navigate to visited pages blazing fast!

The search logic is defined on the page component because it is one of the main
actions of this page. We have the details in external hooks and here we just
connect and sync the search state with the url query params.
*/

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState
}> = async ({ res, query }) => {
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")

  const params = getCharacterListSearchParams(query)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: getCharactersSearchQueryKey(params),
    queryFn: characterSearchQueryFn,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Home = () => {
  const router = useRouter()
  const params = getCharacterListSearchParams(router.query)
  const search = params.search ?? ""

  const onSearch = async (search: string) => {
    const url = getSearchUrl(router.pathname, search)
    await router.push(url, undefined, { shallow: true })
  }

  const [, onSearchChange] = useDebouncedValue({
    defaultValue: search,
    onDebouncedChange: onSearch,
  })

  const result = useCharactersSearchQuery({
    search: params.search,
    page: params.page,
  })

  return (
    <>
      <Head>
        <title>Swapi Characters</title>
        <meta name="description" content="Swapi characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>
        <SearchBar
          label={"Search character name"}
          defaultValue={search}
          onChange={onSearchChange}
        />

        <CharactersListContainer {...result} pathname={router.pathname} />
      </MainWrapper>
    </>
  )
}

export default Home
