/*
This component can be reused in case we need other search bars
for different entities.

The current implementation looks like a generic input field,
but is good to create a component in the context of the "search" feature
because we can add more styles specific to a search functionality,
like adding some icons, autocomplete, animation on focus, ...
*/
export const SearchBar = ({
  label,
  defaultValue,
  onChange,
}: {
  label: string
  defaultValue: string
  onChange: (newValue: string) => void
}) => {
  return (
    <div className="flex justify-start items-baseline gap-4">
      <label htmlFor="searchInput" className="text-white">
        {label}
      </label>
      <input
        id="searchInput"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
