import { createLazyFileRoute } from '@tanstack/react-router'
import React, { ChangeEvent, Children, useRef, useState } from 'react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const [value, setValue] = useState('Hello!')
  const inputValue = useRef('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputValue.current = e.target.value
  }

  const handleChangeClick = () => {
    setValue(inputValue.current)
  }

  return (
    <div>
      <input ref={inputRef} type='text' onChange={handleInputChange} />
      <button onClick={handleChangeClick}>Set Value</button>      
      <button onClick={() => setValue(v => v + '!')}>Add Emphasis</button>
      <button onClick={() => inputRef.current?.focus()}>Set Focus</button>
      <p>
        The current value is: { value }
      </p>
      <p>
        The current input value is: {inputValue.current}
      </p>
    </div>
  )
}