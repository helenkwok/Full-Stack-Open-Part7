import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const input = {
    name,
    value,
    onChange
  }

  const reset = () => setValue('')

  return {
    input,
    reset
  }
}