import type { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query"

import {
  characterDetailsQueryFn,
  getCharacterDetailsQueryKey,
  useCharacterDetailsQuery,
} from "@/hooks/characters/useCharacterDetailsQuery"
import { getDetailsParams } from "@/helpers/characterDetailsParams"
import { MainWrapper } from "@/components/shared/MainWrapper"
import { CharacterDetailsContainer } from "@/components/characters/CharacterDetailsContainer"

/*
We are using static props with fallback here because potentially every
character's page can be generated at some point, and we will be able to serve
them as html, without the need to generate all of them upfront during built time.

The page component also works as the "edge" of the application, the point where
we connect parts of the request (the id on the url) with our API request. To prevent
errors due to bad inputs, there are validation functions that help us to catch
invalid IDs, to give more context to the user of why a request may be wrong

This helps to have pure components down the tree.
*/

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState
}> = async ({ params }) => {
  const { id } = getDetailsParams(params)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: getCharacterDetailsQueryKey({ id: id ?? -1 }),
    queryFn: characterDetailsQueryFn,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

const CharacterDetailsPage = () => {
  const router = useRouter()
  const { id } = getDetailsParams(router.query)
  const defaultInvalidId = -1

  const result = useCharacterDetailsQuery({
    id: id ?? defaultInvalidId,
  })

  return (
    <>
      <Head>
        <title>{result?.data?.result.name}</title>
        <meta
          name="description"
          content={`Swapi - ${result?.data?.result.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>
        <CharacterDetailsContainer
          id={id}
          isFallback={router.isFallback}
          {...result}
        />
      </MainWrapper>
    </>
  )
}

export default CharacterDetailsPage
