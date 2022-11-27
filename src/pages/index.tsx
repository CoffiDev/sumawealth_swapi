import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"

import {
  getCharactersList,
  CharactersListSearchParams,
  type PeopleResponse,
} from "../api/swapi"
import { CharactersSearchBar } from "../components/charactersList/CharactersSearchBar"
import {
  characterSearchQueryFn,
  getCharacterSearchQueryKey,
  useCharactersSearchQuery,
} from "../hooks/charactersList/useCharactersSearchQuery"
import { useRouter } from "next/router"
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query"

import { z } from "zod"
import { ParsedUrlQuery } from "querystring"

const pageSchema = z.preprocess((a) => {
  const defaultPage = 1
  const preValue = parseInt(
    z.string().default(defaultPage.toString()).parse(a),
    10
  )
  return isNaN(preValue) ? defaultPage : preValue
}, z.number().positive().nullish().default(null))

const searchSchema = z.string().nullish().default(null)

const getCharacterListSearchParams = (
  query: ParsedUrlQuery
): CharactersListSearchParams => {
  const search = searchSchema.parse(query.search)

  const page = pageSchema.parse(query.page)

  return { search, page }
}

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

const NavigationButton = ({
  url,
  label,
}: {
  url: string | null
  label: string
}) => {
  if (!url) {
    return null
  }

  const search = new URL(url).search

  const nextLinkHref = {
    pathname: "/",
    search,
  }

  return (
    <Link href={nextLinkHref} shallow={true} className="text-white">
      {label}
    </Link>
  )
}

const CharactersList = (props: CharactersListSearchParams) => {
  const { data, isLoading, isError, isPaused } = useCharactersSearchQuery(props)

  if (isError) {
    return <p>Error occurred!</p>
  }

  if (isPaused) {
    return <p>Check your internet connection</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const results = data?.results

  if (results?.length === 0) {
    return <p>No results found</p>
  }

  const resultsList = results?.map((people) => {
    return (
      <div key={people.name} className="text-white">
        {people.name}
      </div>
    )
  })

  return (
    <>
      {resultsList}

      <div className="flex justify-between items-baseline gap-8">
        <NavigationButton url={data?.previous} label={"Previous page"} />

        <NavigationButton url={data?.next} label={"Next page"} />
      </div>
    </>
  )
}

const Home = () => {
  const router = useRouter()
  const params = getCharacterListSearchParams(router.query)

  return (
    <>
      <Head>
        <title>Swapi Characters</title>
        <meta name="description" content="Swapi characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">SW</span> API
          </h1>

          <CharactersSearchBar />

          <CharactersList {...params} />
        </div>
      </main>
    </>
  )
}

export default Home
