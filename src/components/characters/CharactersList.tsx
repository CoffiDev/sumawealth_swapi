import { CharactersListSearchParams } from "../../api/swapi"
import { useCharactersSearchQuery } from "../../hooks/charactersList/useCharactersSearchQuery"
import { PaginationLink } from "../search/PaginationLink"

export const CharactersList = (
  props: CharactersListSearchParams & { pathname: string }
) => {
  const { data, isLoading, isError, isPaused } = useCharactersSearchQuery({
    search: props.search,
    page: props.page,
  })

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
      <p className="text-[hsl(280,100%,70%)]">Total: {data?.count}</p>

      {resultsList}

      <div className="flex justify-between items-baseline gap-8">
        <PaginationLink
          url={data?.previous}
          label={"Previous page"}
          pathname={props.pathname}
        />

        <PaginationLink
          url={data?.next}
          label={"Next page"}
          pathname={props.pathname}
        />
      </div>
    </>
  )
}
