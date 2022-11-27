import type { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query"

import {
  getCharacterListSearchParams,
  getSearchUrl,
} from "../helpers/characterListUrl"
import {
  characterSearchQueryFn,
  getCharacterSearchQueryKey,
} from "../hooks/charactersList/useCharactersSearchQuery"
import { useDebouncedValue } from "../hooks/utils/useDebounceValue"
import { SearchBar } from "../components/search/SearchBar"
import { CharactersList } from "../components/characters/CharactersList"
import { MainWrapper } from "../components/shared/MainWrapper"

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState
}> = async ({ res, query }) => {
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")

  const params = getCharacterListSearchParams(query)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: getCharacterSearchQueryKey(params),
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

        <CharactersList {...params} pathname={router.pathname} />
      </MainWrapper>
    </>
  )
}

export default Home
