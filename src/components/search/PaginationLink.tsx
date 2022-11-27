import Link from "next/link"

export const PaginationLink = ({
  url,
  label,
  pathname,
}: {
  url: string | null
  label: string
  pathname: string
}) => {
  if (!url) {
    return null
  }

  const search = new URL(url).search

  return (
    <Link
      href={{ pathname, search }}
      shallow={true}
      className="text-[hsl(280,100%,70%)]"
    >
      {label}
    </Link>
  )
}
