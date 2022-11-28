import Link from "next/link"
import { useCharacterDetailsQuery } from "@/hooks/characters/useCharacterDetailsQuery"
import { People } from "../../api/swapi"

export const CharacterDetails = ({
  character: data,
}: {
  character?: People
}) => {
  return (
    <>
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
    </>
  )
}
