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
