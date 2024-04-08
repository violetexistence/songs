import { PropsWithChildren, ReactNode, createContext, useContext, useState } from "react";

export type NavActionsContext = {
  navActions: ReactNode,
  setNavActions: (value: ReactNode) => void
}

const initialActions = <></>
const context = createContext<NavActionsContext>({
  navActions: initialActions,
  setNavActions: () => {}
})
const Provider = context.Provider

export function NavActionsProvider({ children }: PropsWithChildren) {
  const [navActions, setNavActions] = useState<ReactNode>(initialActions)

  return (
    <Provider value={{ navActions, setNavActions }}>
      { children }
    </Provider>
  )
}

export const useNavActions = () => useContext(context)