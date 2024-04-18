import { PropsWithChildren, ReactNode, useState } from 'react'
import { NavActionsContext } from './useNavActions'

export function NavActionsProvider({ children }: PropsWithChildren) {
  const [navActions, setNavActions] = useState<ReactNode>(<></>)

  return (
    <NavActionsContext.Provider value={{ navActions, setNavActions }}>
      {children}
    </NavActionsContext.Provider>
  )
}
