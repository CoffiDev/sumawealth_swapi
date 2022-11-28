import Link from "next/link"

// reference: https://www.hyperui.dev/components/application-ui/error-pages
/*
Reusable component handle unsuccessful request.
Offers the option to go back to the home to prevent the user from feeling lost
 */
export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="grid px-4 bg-white place-content-center dark:bg-transparent">
      <div className="text-center">
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">{message}</p>

        <Link
          href={{ pathname: "/" }}
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-fuchsia-500 rounded hover:bg-fuchsia-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
