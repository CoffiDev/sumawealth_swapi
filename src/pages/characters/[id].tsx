import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query"

import { MainWrapper } from "@/components/shared/MainWrapper"
import {
  characterDetailsQueryFn,
  getCharacterDetailsQueryKey,
  useCharacterDetailsQuery,
} from "@/hooks/characters/useCharacterDetailsQuery"
import Link from "next/link"

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState
}> = async ({ params }) => {
  const queryClient = new QueryClient()

  // console.log(params, "seseseseses")

  await queryClient.prefetchQuery({
    queryKey: getCharacterDetailsQueryKey({ id: (params?.id as string) ?? "" }),
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

const CharacterDetails = () => {
  const router = useRouter()

  // console.log(router, "wowowowowowow")

  const { data } = useCharacterDetailsQuery({ id: router.query.id })

  return (
    <>
      <Head>
        <title>Swapi Characters</title>
        <meta name="description" content="Swapi characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>
        <p className="text-[hsl(280,100%,70%)]">{data?.name}</p>

        <div className="text-white flex flex-col gap-8">
          <div className="flex justify-between align-baseline gap-8">
            <p>{data?.birth_year}</p>
            <p>{data?.gender}</p>
          </div>

          <div className="flex justify-between align-baseline gap-8">
            <p>{data?.height}cm</p>
            <p>{data?.mass}kg</p>
          </div>

          <div className="flex justify-between align-baseline gap-8">
            <p>eyes: {data?.eye_color}</p>
            <p>hair: {data?.hair_color}</p>
            <p>skin: {data?.skin_color}</p>
          </div>
        </div>

        <Link href={{ pathname: `/` }} className="text-[hsl(280,100%,70%)]">
          Back
        </Link>
      </MainWrapper>
    </>
  )
}

export default CharacterDetails
