import Link from "next/link"

/*
Component with very specific function that encapsulates some logic
around how we are handling the navigation of the list view.
*/
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
      className="text-fuchsia-500"
    >
      {label}
    </Link>
  )
}
