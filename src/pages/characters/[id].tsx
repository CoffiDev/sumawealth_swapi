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
import { CharacterDetails } from "@/components/characters/CharacterDetails"

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
      isValidId: Boolean(id),
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

const CharacterDetailsPage = ({ isValidId }: { isValidId: boolean }) => {
  const router = useRouter()
  const { id } = getDetailsParams(router.query)

  const { data, isLoading, isError } = useCharacterDetailsQuery({
    id: id ?? -1,
  })

  let Content = null

  if (isLoading || router.isFallback) {
    Content = <p>Loading...</p>
  } else if (!id || !isValidId) {
    Content = <p>Invalid Id</p>
  } else if (data?.status !== 200) {
    Content = <p>Not found</p>
  } else {
    Content = <CharacterDetails character={data.result} />
  }

  return (
    <>
      <Head>
        <title>{data?.result.name}</title>
        <meta name="description" content={`Swapi - ${data?.result.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>{Content}</MainWrapper>
    </>
  )
}

export default CharacterDetailsPage
