import { i } from '@instantdb/react'

const _schema = i.schema({
  entities: {
    signups: i.entity({
      name: i.string().optional(),
      email: i.string().unique().indexed(),
      source: i.string().indexed().optional(),
      createdAt: i.number().indexed(),
    }),
  },
})

type _AppSchema = typeof _schema
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema
export type { AppSchema }
export default schema


