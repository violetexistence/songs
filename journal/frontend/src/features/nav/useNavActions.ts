import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect
} from 'react'

type Props = {
  navActions: ReactNode
  setNavActions: (value: ReactNode) => void
}

export const NavActionsContext = createContext<Props | null>(null)

export function useNavActions(actions?: ReactNode) {
  const currentContext = useContext(NavActionsContext)

  if (currentContext === null) {
    throw Error('useNavActions must be used within a NavActionsProvider')
  }

  const { navActions, setNavActions } = currentContext

  useLayoutEffect(() => {
    actions && setNavActions(actions)

    return () => {
      setNavActions(null)
    }
  }, [actions, setNavActions])

  return navActions
}
