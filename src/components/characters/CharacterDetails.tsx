import Link from "next/link"
import { People } from "../../api/swapi"

/*
This pure component is only in charge of
presenting the info from a character.
 */
export const CharacterDetails = ({
  character: data,
}: {
  character?: People
}) => {
  return (
    <>
      <p className="text-fuchsia-500">{data?.name}</p>

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

      <Link href={{ pathname: `/` }} className="text-fuchsia-500">
        Back
      </Link>
    </>
  )
}
