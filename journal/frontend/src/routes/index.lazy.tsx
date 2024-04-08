import { createLazyFileRoute } from '@tanstack/react-router'
import { useNavActions } from '../features/nav/useNavActions'
import { useLayoutEffect } from 'react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { setNavActions } = useNavActions()

  useLayoutEffect(() => {
    setNavActions(<></>)
  },[])

  return (
    <div className="p-2">
      <h3>Welcome Home =)</h3>
    </div>
  )
}