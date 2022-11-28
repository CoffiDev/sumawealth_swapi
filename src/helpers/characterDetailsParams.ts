import { z, ZodEffects } from "zod"
import { ParsedUrlQuery } from "querystring"

const idSchema = z.preprocess((a) => {
  const preValue = parseInt(z.string().default("").parse(a), 10)
  return isNaN(preValue) ? null : preValue
}, z.number().positive().nullish().default(null))

export const getDetailsParams = (query?: ParsedUrlQuery) => {
  const safeId = idSchema.safeParse(query?.id)

  const id = safeId.success ? safeId.data : null

  return { id }
}
