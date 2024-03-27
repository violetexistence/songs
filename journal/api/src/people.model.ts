import Elysia, { Static, t } from "elysia";

export const personType = t.Object({
  id: t.Numeric(),
  name: t.String(),
  notes: t.Optional(t.Nullable(t.String())),
  avatar: t.Optional(t.Nullable(t.String()))
})

export const personCreationData = t.Omit(personType, ['id'])

export const identityParams = t.Object({
  id: t.Numeric()
})

export type Person = Static<typeof personType>