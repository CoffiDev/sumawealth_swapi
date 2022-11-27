import { useEffect, useRef, useState } from "react"
import { useDebounce } from "./useDebounce"

export const useDebouncedValue = ({
  defaultValue,
  delay = 500,
  onDebouncedChange,
}: {
  defaultValue: string
  delay?: number
  onDebouncedChange: (newValue: string) => void | Promise<void>
}) => {
  const prevValue = useRef(defaultValue)

  const [value, setValue] = useState(defaultValue)

  const debouncedSearchTerm = useDebounce(value, delay)

  const onNewDebouncedValue = () => {
    if (debouncedSearchTerm || debouncedSearchTerm != prevValue.current) {
      onDebouncedChange(debouncedSearchTerm)
    }

    prevValue.current = debouncedSearchTerm
  }

  useEffect(() => {
    onNewDebouncedValue()
  }, [debouncedSearchTerm])

  return [debouncedSearchTerm, setValue] as const
}
