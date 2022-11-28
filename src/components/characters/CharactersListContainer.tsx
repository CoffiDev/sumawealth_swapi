import { Loader } from "@/components/shared/Loader"
import { ErrorMessage } from "@/components/shared/ErrorMessage"
import { CharactersList } from "@/components/characters/CharactersList"
import { type PeoplePaginatedResponse } from "@/api/swapi"

/*
This container allows us to handle all the different states
that our component may support on a single and lean file.

For example, here we have a condition to handle the case
when there are no results on the search.

We could abstract this behaviour and have a Container for
list that can have empty items, but to avoid a preemptive optimization,
we have it coupled to this particular case.
*/
export const CharactersListContainer = ({
  pathname,
  data,
  isError,
  isPaused,
  isLoading,
}: {
  pathname: string
  data?: PeoplePaginatedResponse
  isError: boolean
  isPaused: boolean
  isLoading: boolean
}) => {
  if (isPaused) {
    return (
      <ErrorMessage
        message={"An error occurred. Check your internet connection"}
      />
    )
  } else if (isLoading) {
    return <Loader />
  } else if (isError) {
    return <ErrorMessage message={"An error occurred. Try again later."} />
  } else if (data?.status !== 200) {
    return <ErrorMessage message={"We can't find that page."} />
  } else if (data?.result.results.length === 0) {
    return (
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        {"No results matched this search."}
      </p>
    )
  } else {
    return <CharactersList data={data} pathname={pathname} />
  }
}
