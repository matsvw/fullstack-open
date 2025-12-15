import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const inputProps = {
    value,
    type,
    onChange: (e) => setValue(e.target.value),
  };

  const actions = {
    reset: () => setValue(''),
    set: setValue,
  };

  return [inputProps, actions];

}

