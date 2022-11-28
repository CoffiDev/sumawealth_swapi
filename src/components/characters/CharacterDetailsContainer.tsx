import { CharacterDetails } from "@/components/characters/CharacterDetails"
import { Loader } from "@/components/shared/Loader"
import { ErrorMessage } from "@/components/shared/ErrorMessage"
import { PeopleDetailsResponse } from "../../api/swapi"

/*
This container allows us to handle all the different states
that our component may support on a single and lean file.

For example, here we have a condition to handle the case
when the id is not a valid positive number, that is
specific to this page.

We could abstract this behaviour and have a Container for
pages that rely on an ID, but to avoid a preemptive optimization,
we have it coupled to this particular case.
 */
export const CharacterDetailsContainer = ({
  id,
  data,
  isError,
  isPaused,
  isLoading,
  isFallback,
}: {
  id: number | null
  data?: PeopleDetailsResponse
  isError: boolean
  isPaused: boolean
  isLoading: boolean
  isFallback: boolean
}) => {
  if (isPaused) {
    return (
      <ErrorMessage
        message={"An error occurred. Check your internet connection"}
      />
    )
  } else if (isLoading || isFallback) {
    return <Loader />
  } else if (isError) {
    return <ErrorMessage message={"An error occurred. Try again later."} />
  } else if (!id || !Boolean(id)) {
    return <ErrorMessage message={"Invalid Id."} />
  } else if (data?.status !== 200) {
    return <ErrorMessage message={"We can't find that page."} />
  } else {
    return <CharacterDetails character={data.result} />
  }
}
