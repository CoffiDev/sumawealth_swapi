import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"

import { getCharactersList, type PeopleResponse } from "../api/swapi"

export const getServerSideProps: GetServerSideProps<{
  data: PeopleResponse
}> = async ({ res, query }) => {
  const data = await getCharactersList(query)

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")

  return {
    props: {
      data,
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
    <Link href={nextLinkHref} className="text-white">
      {label}
    </Link>
  )
}

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const p = data.results.map((people) => {
    return (
      <div key={people.name} className="text-white">
        {people.name}
      </div>
    )
  })

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

          {p}

          <div className="flex justify-between items-baseline gap-8">
            <NavigationButton url={data.previous} label={"Previous page"} />

            <NavigationButton url={data.next} label={"Next page"} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
