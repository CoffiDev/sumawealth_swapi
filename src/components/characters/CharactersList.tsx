import Link from "next/link"

import { type PeoplePaginatedResponse, peoplePath } from "@/api/swapi"
import { PaginationLink } from "@/components/search/PaginationLink"

/*
This pure component is in charge of
presenting the info from the search/page result.

It still has a couple of responsibilities, like rendering
each list item, the total count and the pagination links,
but this elements can be moved to other components as they
need, for our current view, they can live inside this pure component
without trouble.
*/
export const CharactersList = ({
  data,
  pathname,
}: {
  data: PeoplePaginatedResponse
  pathname: string
}) => {
  const results = data?.result.results

  const resultsList = results?.map((people) => {
    const target = new URL(people.url).pathname.replace(peoplePath, "")

    return (
      <Link
        href={{ pathname: `/characters/${target}` }}
        key={people.name}
        className="text-white underline"
      >
        {people.name}
      </Link>
    )
  })

  return (
    <>
      <p className="text-fuchsia-500">Total: {data?.result.count}</p>

      {resultsList}

      <div className="flex justify-between items-baseline gap-8">
        <PaginationLink
          url={data?.result.previous}
          label={"Previous page"}
          pathname={pathname}
        />

        <PaginationLink
          url={data?.result.next}
          label={"Next page"}
          pathname={pathname}
        />
      </div>
    </>
  )
}
